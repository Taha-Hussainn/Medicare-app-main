import { supabase } from '../supabase/client'

export const uploadMedicalRecord = async (patientId, patientName, file, category, description) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${patientId}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('medical-records')
      .upload(fileName, file)

    if (uploadError) return { success: false, error: uploadError.message }

    const { data: urlData } = supabase.storage
      .from('medical-records')
      .getPublicUrl(fileName)

    const { data, error } = await supabase.from('medical_records').insert({
      patient_id: patientId,
      patient_name: patientName,
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_type: file.type,
      file_size: (file.size / 1024).toFixed(2) + ' KB',
      category,
      description
    }).select().single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const getMedicalRecordsByPatient = async (patientId) => {
  try {
    const { data, error } = await supabase
      .from('medical_records').select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const deleteMedicalRecord = async (id, fileUrl) => {
  try {
    const fileName = fileUrl.split('/medical-records/')[1]
    await supabase.storage.from('medical-records').remove([fileName])
    const { error } = await supabase.from('medical_records').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}