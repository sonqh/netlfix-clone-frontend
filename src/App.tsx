import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home-page'
import LoginPage from './pages/login-page'
import SignupPage from './pages/signup-page'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useAuthStore } from './store/auth-user'

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
