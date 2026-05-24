import { supabase } from '../supabase/client'

export const signUp = async (email, password, userData) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { success: false, error: error.message }

    const user = data.user

    await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      name: userData.name || '',
      user_type: userData.userType || 'patient',
      phone: userData.phone || '',
      address: userData.address || '',
      specialization: userData.specialization || '',
      experience: userData.experience || '',
      is_active: true
    })

    if (userData.userType === 'doctor') {
      await supabase.from('doctors').insert({
        id: user.id,
        name: userData.name || '',
        specialization: userData.specialization || 'General Physician',
        qualification: '',
        experience: parseInt(userData.experience) || 0,
        fee: 0,
        rating: 0,
        total_reviews: 0,
        location: '',
        hospital: '',
        clinic: '',
        description: 'Profile not completed yet.',
        about: '',
        available_days: [],
        available_time: '',
        languages: [],
        services: [],
        education: [],
        awards: [],
        contact: { phone: userData.phone || '', email: email, website: '' },
        emergency: false,
        insurance: [],
        slots: []
      })
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        userType: userData.userType || 'patient',
        ...userData
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, error: error.message }

    const { data: profile } = await supabase
      .from('users').select('*').eq('id', data.user.id).single()

    if (!profile) return { success: false, error: 'Account not found.' }

    // Block deactivated accounts
    if (profile.is_active === false) {
      await supabase.auth.signOut()
      return { success: false, error: 'Your account has been removed by the admin.' }
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        ...profile,
        userType: profile.user_type
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const logout = async () => {
  await supabase.auth.signOut()
  return { success: true }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile } = await supabase
      .from('users').select('*').eq('id', user.id).single()

    if (!profile || profile.is_active === false) {
      await supabase.auth.signOut()
      return null
    }

    return {
      id: user.id,
      email: user.email,
      ...profile,
      userType: profile.user_type
    }
  } catch {
    return null
  }
}