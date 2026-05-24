import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { getCurrentUser } from '../api/auth'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null)
      } else if (session?.user) {
        getCurrentUser().then(user => setCurrentUser(user))
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}