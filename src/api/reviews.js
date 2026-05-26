import { supabase } from '../supabase/client'

export const addReview = async (reviewData) => {
  try {
    const { data, error } = await supabase.from('reviews').insert({
      doctor_id: reviewData.doctorId,
      patient_id: reviewData.patientId,
      patient_name: reviewData.patientName,
      rating: reviewData.rating,
      comment: reviewData.comment,
      tags: reviewData.tags || [],
      is_approved: true
    }).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getReviewsByDoctor = async (doctorId) => {
  try {
    const { data, error } = await supabase
      .from('reviews').select('*')
      .eq('doctor_id', doctorId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getAllReviews = async () => {
  try {
    const { data, error } = await supabase
      .from('reviews').select('*')
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const deleteReview = async (id) => {
  try {
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const checkExistingReview = async (doctorId, patientId) => {
  try {
    const { data } = await supabase.from('reviews').select('id')
      .eq('doctor_id', doctorId)
      .eq('patient_id', patientId)
      .single()
    return !!data
  } catch {
    return false
  }
}