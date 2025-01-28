import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home-page'
import LoginPage from './pages/login-page'
import SignupPage from './pages/signup-page'
import LandingPage from './pages/public-pages/landing'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { useAuth } from './hooks/use-auth'
import ProtectedRoute from './routes/protected-route'
import SearchPage from './pages/search-page'
import SearchHistoryPage from './pages/search-history'

function App() {
  const { isCheckingAuth, authCheck, user } = useAuth()

  useEffect(() => {
    if (!isCheckingAuth) {
      authCheck()
    }
  }, [authCheck, isCheckingAuth])

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
        <Route index element={user ? <HomePage /> : <LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='home'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='search'
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='history'
          element={
            <ProtectedRoute>
              <SearchHistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
