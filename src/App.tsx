import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home-page'
import LandingPage from './pages/public-pages/landing'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { useAuth } from './hooks/use-auth'
import ProtectedRoute from './routes/protected-route'
import LoginPage from './pages/auth/login-page'
import SignupPage from './pages/auth/signup-page'
import MoviesPage from './pages/home/movies-page'
import TVShowsPage from './pages/home/tv-shows-page'
import WatchPage from './pages/watch/watch-page'
import SearchPage from './pages/search/search-page'
import SearchHistoryPage from './pages/search/search-history'
import NotFound from './pages/errors/not-found'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/_components/error-fallback'

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
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
        onError={(error, info) => {
          console.error('Error Boundary caught an error:', error, info)
        }}
      >
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
            path='movies'
            element={
              <ProtectedRoute>
                <MoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='tv-shows'
            element={
              <ProtectedRoute>
                <TVShowsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='watch/:id'
            element={
              <ProtectedRoute>
                <WatchPage />
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

          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Toaster />
    </>
  )
}

export default App
