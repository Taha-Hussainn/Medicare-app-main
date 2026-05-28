import { useState, useEffect } from 'react'
import { Calendar, Clock, User, LogOut, Plus, Trash2, MessageCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getAppointmentsByUser, updateAppointmentStatus, deleteAppointment } from '../api/appointments'
import { getCurrentUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { getChatsByPatient } from '../api/chat'
import ChatWindow from '../components/ChatWindow'

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user) { navigate('/login'); return }
      setCurrentUser(user)
      getAppointmentsByUser(user.id).then(result => {
        if (result.success) setAppointments(result.data)
        setLoading(false)
      })
      getChatsByPatient(user.id).then(result => {
        if (result.success) setChats(result.data)
      })
    })
  }, [])

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    const result = await updateAppointmentStatus(id, 'cancelled')
    if (result.success) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return
    const result = await deleteAppointment(id)
    if (result.success) setAppointments(prev => prev.filter(a => a.id !== id))
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const statusColor = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-800'
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
    if (status === 'cancelled') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <Link to="/doctors" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center">
          <Plus className="h-5 w-5 mr-2" />New Appointment
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{currentUser?.name || 'Loading...'}</h3>
                <p className="text-gray-600 text-sm">{currentUser?.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'appointments' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <Calendar className="h-5 w-5 mr-3" />My Appointments
              </button>
              <button onClick={() => setActiveTab('chats')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'chats' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <MessageCircle className="h-5 w-5 mr-3" />My Chats
                {chats.length > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chats.length}
                  </span>
                )}
              </button>
              <button onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <User className="h-5 w-5 mr-3" />Profile
              </button>
              <button onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition text-red-600">
                <LogOut className="h-5 w-5 mr-3" />Logout
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">My Appointments ({appointments.length})</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments yet.</p>
                  <Link to="/doctors" className="text-red-600 font-medium hover:underline mt-2 inline-block">
                    Book your first appointment
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{appointment.doctor_name}</h3>
                          <div className="flex items-center space-x-6 mt-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />{appointment.date}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />{appointment.time}
                            </div>
                          </div>
                          {appointment.symptoms && (
                            <p className="text-gray-600 text-sm mt-2">Symptoms: {appointment.symptoms}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <p className="text-2xl font-bold mt-2">Rs. {appointment.fee}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-4">
                        {appointment.status === 'pending' && (
                          <button onClick={() => handleCancel(appointment.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Cancel
                          </button>
                        )}
                        <button onClick={() => handleDelete(appointment.id)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                          <Trash2 className="h-4 w-4 mr-1" />Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chats' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">My Chats ({chats.length})</h2>
              </div>
              {chats.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No chats yet.</p>
                  <p className="text-sm mt-1">Book an appointment to start chatting with a doctor.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {chats.map(chat => (
                    <div key={chat.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold">Dr</span>
                        </div>
                        <div>
                          <p className="font-semibold">{chat.doctor_name}</p>
                          <p className="text-sm text-gray-500">Tap to open chat</p>
                        </div>
                      </div>
                      <button onClick={() => setActiveChat(chat)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />Open Chat
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" defaultValue={currentUser?.name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue={currentUser?.email} disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" defaultValue={currentUser?.phone}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeChat && (
        <ChatWindow
          chat={activeChat}
          currentUser={currentUser}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  )
}

export default UserDashboard