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
      is_approved: false
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