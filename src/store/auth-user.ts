import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

type Credentials = {
  email: string
  password: string
  username?: string
}

type User = {
  username: string
  email: string
  image?: string
  searchHistory?: string[]
}

type AuthResponse = {
  user: User
  token: string
  success: boolean
}

type AuthState = {
  user: User | null
  isSigningUp: boolean
  isCheckingAuth: boolean
  isLoggingOut: boolean
  isLoggingIn: boolean
  signup: (credentials: Credentials) => Promise<void>
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
  authCheck: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => {
  const handleError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error(defaultMessage)
    }
  }

  return {
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,

    signup: async (credentials: Credentials) => {
      set({ isSigningUp: true })
      try {
        const { data } = await axios.post<AuthResponse>('/api/v1/auth/signup', credentials)
        set({ user: data.user })
        toast.success('Account created successfully')
      } catch (error) {
        handleError(error, 'Signup failed')
        set({ user: null })
      } finally {
        set({ isSigningUp: false })
      }
    },

    login: async (credentials: Credentials) => {
      set({ isLoggingIn: true })
      try {
        const { data } = await axios.post<AuthResponse>('/api/v1/auth/login', credentials)
        set({ user: data.user })
        localStorage.setItem('token', data.token)
      } catch (error) {
        handleError(error, 'Login failed')
        set({ user: null })
      } finally {
        set({ isLoggingIn: false })
      }
    },

    logout: async () => {
      set({ isLoggingOut: true })
      try {
        await axios.post('/api/v1/auth/logout')
        set({ user: null })
        localStorage.removeItem('token')
        toast.success('Logged out successfully')
      } catch (error) {
        handleError(error, 'Logout failed')
      } finally {
        set({ isLoggingOut: false })
      }
    },

    authCheck: async () => {
      set({ isCheckingAuth: true })
      const token = localStorage.getItem('token')
      if (!token) {
        set({ isCheckingAuth: false, user: null })
        return
      }

      try {
        const { data } = await axios.get<AuthResponse>('/api/v1/auth/authCheck', {
          headers: { Authorization: `Bearer ${token}` }
        })
        set({ user: data.user })
      } catch (error) {
        handleError(error, 'Authentication check failed')
        set({ user: null })
      } finally {
        set({ isCheckingAuth: false })
      }
    }
  }
})
