import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../provider/auth-provider'
import App from '../App'

jest.mock('react-hot-toast', () => ({ Toaster: () => <div data-testid='toaster' /> }))
jest.mock('lucide-react', () => ({ Loader: () => <div data-testid='loader' /> }))

describe('App Component', () => {
  test('shows loader while checking auth', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isCheckingAuth: true,
            authCheck: jest.fn(),
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
            isLoggingIn: false,
            signup: jest.fn(),
            isSigningUp: false
          }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    expect(screen.getByTestId('loader')).toBeTruthy()
  })

  test('renders landing page if user is not authenticated', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isCheckingAuth: false,
            authCheck: jest.fn(),
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
            isLoggingIn: false,
            signup: jest.fn(),
            isSigningUp: false
          }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByText(/Landing/i)).toBeTruthy())
  })

  test('renders home page if user is authenticated', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isCheckingAuth: false,
            authCheck: jest.fn(),
            user: { username: 'testUser', email: 'test@gmail.com' },
            login: jest.fn(),
            logout: jest.fn(),
            isLoggingIn: false,
            signup: jest.fn(),
            isSigningUp: false
          }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByText(/Home/i)).toBeTruthy())
  })

  test('redirects to login page for protected routes when not authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <AuthContext.Provider
          value={{
            isCheckingAuth: false,
            authCheck: jest.fn(),
            user: null,
            login: jest.fn(),
            logout: jest.fn(),
            isLoggingIn: false,
            signup: jest.fn(),
            isSigningUp: false
          }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByText(/Login/i)).toBeTruthy())
  })

  test('renders protected route when user is authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <AuthContext.Provider
          value={{
            isCheckingAuth: false,
            authCheck: jest.fn(),
            user: { username: 'testUser', email: 'test@gmail.com' },
            login: jest.fn(),
            logout: jest.fn(),
            isLoggingIn: false,
            signup: jest.fn(),
            isSigningUp: false
          }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByText(/Movies/i)).toBeTruthy())
  })

  test('renders error boundary fallback on error', async () => {
    const ThrowError = () => {
      throw new Error('Test Error')
    }
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isCheckingAuth: false,
            authCheck: jest.fn(),
            user: { username: 'testUser', email: 'test@gmail.com' },
            login: jest.fn(),
            logout: jest.fn(),
            isLoggingIn: false,
            signup: jest.fn(),
            isSigningUp: false
          }}
        >
          <Routes>
            <Route path='/' element={<ThrowError />} />
          </Routes>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.getByText(/Something went wrong/i)).toBeTruthy())
  })
})
