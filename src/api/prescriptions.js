import { supabase } from '../supabase/client'

export const createPrescription = async (data) => {
  try {
    const { data: result, error } = await supabase
      .from('prescriptions').insert({
        appointment_id: data.appointmentId,
        patient_id: data.patientId,
        doctor_id: data.doctorId,
        patient_name: data.patientName,
        doctor_name: data.doctorName,
        diagnosis: data.diagnosis,
        medicines: data.medicines,
        instructions: data.instructions,
        follow_up_date: data.followUpDate
      }).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, data: result }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getPrescriptionsByPatient = async (patientId) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions').select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getPrescriptionsByDoctor = async (doctorId) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions').select('*')
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getPrescriptionById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('prescriptions').select('*').eq('id', id).single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}