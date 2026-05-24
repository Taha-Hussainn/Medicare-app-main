import { supabase } from '../supabase/client'

export const createAppointment = async (appointmentData) => {
  try {
    const { data, error } = await supabase.from('appointments').insert({
      patient_id: appointmentData.patientId,
      patient_name: appointmentData.patientName,
      patient_email: appointmentData.patientEmail,
      patient_phone: appointmentData.patientPhone,
      doctor_id: appointmentData.doctorId,
      doctor_name: appointmentData.doctorName,
      date: appointmentData.date,
      time: appointmentData.time,
      symptoms: appointmentData.symptoms,
      notes: appointmentData.notes || '',
      fee: appointmentData.fee,
      status: 'pending'
    }).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getAppointmentsByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('appointments').select('*')
      .eq('patient_id', userId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getAppointmentsByDoctor = async (doctorId) => {
  try {
    const { data, error } = await supabase
      .from('appointments').select('*')
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getAllAppointments = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments').select('*')
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const updateAppointmentStatus = async (id, status) => {
  try {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const deleteAppointment = async (id) => {
  try {
    const { error } = await supabase.from('appointments').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}