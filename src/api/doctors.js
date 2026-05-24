import { supabase } from '../supabase/client'

export const getAllDoctors = async () => {
  const { data, error } = await supabase.from('doctors').select('*')
  if (error) { console.error(error); return [] }
  return data
}

export const getDoctorById = async (id) => {
  const { data, error } = await supabase.from('doctors').select('*').eq('id', id).single()
  if (error) { console.error(error); return null }
  return data
}

export const deleteDoctor = async (id) => {
  // Remove from doctors table
  const { error: doctorError } = await supabase.from('doctors').delete().eq('id', id)
  if (doctorError) return { success: false, error: doctorError.message }

  // Deactivate from users table so they can't login
  const { error: userError } = await supabase
    .from('users')
    .update({ is_active: false })
    .eq('id', id)

  if (userError) return { success: false, error: userError.message }
  return { success: true }
}