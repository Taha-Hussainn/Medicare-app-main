import { supabase } from '../supabase/client'

export const getOrCreateChat = async (patientId, doctorId, patientName, doctorName) => {
  try {
    const { data: existing } = await supabase
      .from('chats').select('*')
      .eq('patient_id', patientId)
      .eq('doctor_id', doctorId)
      .single()

    if (existing) return { success: true, data: existing }

    const { data, error } = await supabase.from('chats').insert({
      patient_id: patientId,
      doctor_id: doctorId,
      patient_name: patientName,
      doctor_name: doctorName
    }).select().single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getMessages = async (chatId) => {
  try {
    const { data, error } = await supabase
      .from('messages').select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const sendMessage = async (chatId, senderId, senderName, senderType, content) => {
  try {
    const { data, error } = await supabase.from('messages').insert({
      chat_id: chatId,
      sender_id: senderId,
      sender_name: senderName,
      sender_type: senderType,
      content
    }).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getChatsByPatient = async (patientId) => {
  try {
    const { data, error } = await supabase
      .from('chats').select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getChatsByDoctor = async (doctorId) => {
  try {
    const { data, error } = await supabase
      .from('chats').select('*')
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}