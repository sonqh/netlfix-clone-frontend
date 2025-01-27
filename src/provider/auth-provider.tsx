import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios'
import { createContext, useCallback, useMemo, useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios-instance'

type Credentials = {
  email: string
  password: string
  username?: string
}

export type User = {
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

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  user: User | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
  isCheckingAuth: boolean
  isLoggingIn: boolean
  authCheck: () => Promise<void>
  signup: (credentials: Credentials) => Promise<void>
  isSigningUp: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const handleError = (error: unknown, defaultMessage: string) => {
  if (axios.AxiosError.ERR_CANCELED) {
    return
  }

  if (axios.isAxiosError(error) && error.response?.data?.message) {
    toast.error(error.response.data.message)
  } else {
    toast.error(defaultMessage)
  }
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null)
  const isCheckingAuthRef = useRef(false)
  const isLoggingInRef = useRef(false)
  const isSigningUpRef = useRef(false)
  const navigate = useNavigate()

  const signup = useCallback(
    async (credentials: Credentials) => {
      isSigningUpRef.current = true
      try {
        const { data } = await axios.post<AuthResponse>('/api/v1/auth/signup', credentials)
        setUser(data.user)
        toast.success('Account created successfully')
        navigate('/home')
      } catch (error) {
        handleError(error, 'Signup failed')
        setUser(null)
      } finally {
        isSigningUpRef.current = false
      }
    },
    [navigate, setUser]
  )

  const login = useCallback(
    async (credentials: Credentials) => {
      isLoggingInRef.current = true
      try {
        const { data } = await axios.post<AuthResponse>('/api/v1/auth/login', credentials)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      } catch (error) {
        handleError(error, 'Login failed')
        setUser(null)
      } finally {
        isLoggingInRef.current = false
      }
    },
    [navigate, setUser]
  )

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/v1/auth/logout')
      setUser(null)
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
      navigate('/', { replace: true })
    } catch (error) {
      handleError(error, 'Logout failed')
    }
  }, [navigate, setUser])

  const authCheck = useCallback(async () => {
    isCheckingAuthRef.current = true
    const token = localStorage.getItem('token')
    if (!token) {
      isCheckingAuthRef.current = false
      setUser(null)
      return
    }

    try {
      const { data } = await axiosInstance.get<AuthResponse>('/api/v1/auth/authCheck', {
        headers: { Authorization: `Bearer ${token}` },
        signal: new AbortController().signal
      })
      setUser(data.user)
    } catch (error) {
      console.log('error', error)
      handleError(error, 'Authentication check failed')
      setUser(null)
    } finally {
      isCheckingAuthRef.current = false
    }
  }, [setUser])

  const value = useMemo(
    () => ({
      user,
      signup,
      isSigningUp: isSigningUpRef.current,
      login,
      logout,
      isCheckingAuth: isCheckingAuthRef.current,
      isLoggingIn: isLoggingInRef.current,
      authCheck
    }),
    [user, login, logout, authCheck, signup]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
