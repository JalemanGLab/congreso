import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/useAuthStore'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const setAuth = useAuthStore(state => state.setAuth)

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Guardar en Zustand
      setAuth(user, session)

      // Navegar al dashboard
      navigate('/dashboard')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido')
      return false
    } finally {
      setLoading(false)
    }
    return true
  }

  const logout = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Limpiar estado
      useAuthStore.getState().clearAuth()
      
      // Redirigir al login
      navigate('/login')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cerrar sesión')
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    logout,
    loading,
    error
  }
}