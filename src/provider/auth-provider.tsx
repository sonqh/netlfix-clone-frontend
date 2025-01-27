import axios from 'axios'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

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
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    toast.error(error.response.data.message)
  } else {
    toast.error(defaultMessage)
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const navigate = useNavigate()

  const signup = useCallback(
    async (credentials: Credentials) => {
      setIsSigningUp(true)
      try {
        const { data } = await axios.post<AuthResponse>('/api/v1/auth/signup', credentials)
        setUser(data.user)
        toast.success('Account created successfully')
        navigate('/home')
      } catch (error) {
        handleError(error, 'Signup failed')
        setUser(null)
      } finally {
        setIsSigningUp(false)
      }
    },
    [navigate, setUser]
  )

  const login = useCallback(
    async (credentials: Credentials) => {
      setIsLoggingIn(true)
      try {
        const { data } = await axios.post<AuthResponse>('/api/v1/auth/login', credentials)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      } catch (error) {
        handleError(error, 'Login failed')
        setUser(null)
      } finally {
        setIsLoggingIn(false)
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
    setIsCheckingAuth(true)
    const token = localStorage.getItem('token')
    if (!token) {
      setIsCheckingAuth(false)
      setUser(null)
      return
    }

    try {
      const { data } = await axios.get<AuthResponse>('/api/v1/auth/authCheck', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(data.user)
    } catch (error) {
      handleError(error, 'Authentication check failed')
      setUser(null)
    } finally {
      setIsCheckingAuth(false)
    }
  }, [setUser])

  useEffect(() => {
    authCheck()
  }, [authCheck])

  const value = useMemo(
    () => ({
      user,
      signup,
      isSigningUp,
      login,
      logout,
      isCheckingAuth,
      isLoggingIn,
      authCheck
    }),
    [user, isCheckingAuth, isLoggingIn, login, logout, authCheck, signup, isSigningUp]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
