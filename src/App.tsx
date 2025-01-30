import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { lazy, useEffect, Suspense } from 'react'
import { Loader } from 'lucide-react'
import { useAuth } from './hooks/use-auth'
import ProtectedRoute from './routes/protected-route'
import NotFound from './pages/errors/not-found'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/_components/error-fallback'

const HomePage = lazy(() => import('./pages/home/home-page'))
const LandingPage = lazy(() => import('./pages/public-pages/landing'))
const LoginPage = lazy(() => import('./pages/auth/login-page'))
const SignupPage = lazy(() => import('./pages/auth/signup-page'))
const MoviesPage = lazy(() => import('./pages/home/movies-page'))
const TVShowsPage = lazy(() => import('./pages/home/tv-shows-page'))
const WatchPage = lazy(() => import('./pages/watch/watch-page'))
const SearchPage = lazy(() => import('./pages/search/search-page'))
const SearchHistoryPage = lazy(() => import('./pages/search/search-history'))

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
        <Suspense
          fallback={
            <div className='flex justify-center items-center h-screen'>
              <Loader className='animate-spin text-red-600 size-10' />
            </div>
          }
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
        </Suspense>
      </ErrorBoundary>
      <Toaster />
    </>
  )
}

export default App
