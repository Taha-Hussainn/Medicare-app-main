import { useState, useEffect, useRef } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { getMessages, sendMessage } from '../api/chat'
import { supabase } from '../supabase/client'

const ChatWindow = ({ chat, currentUser, onClose }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    getMessages(chat.id).then(result => {
      if (result.success) setMessages(result.data)
    })

    // Realtime subscription
    const channel = supabase
      .channel(`chat:${chat.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chat.id}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [chat.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    setSending(true)
    await sendMessage(
      chat.id,
      currentUser.id,
      currentUser.name,
      currentUser.userType,
      newMessage.trim()
    )
    setNewMessage('')
    setSending(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const otherPersonName = currentUser.userType === 'patient'
    ? chat.doctor_name
    : chat.patient_name

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col" style={{ height: '500px' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-red-600 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{otherPersonName}</h3>
            <p className="text-red-100 text-xs">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-200" />
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.sender_id === currentUser.id
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                isMe
                  ? 'bg-red-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'
              }`}>
                {!isMe && <p className="text-xs font-semibold text-red-600 mb-1">{msg.sender_name}</p>}
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 ${isMe ? 'text-red-100' : 'text-gray-400'}`}>
                  {new Date(msg.created_at).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white rounded-b-2xl">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend} disabled={sending || !newMessage.trim()}
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow