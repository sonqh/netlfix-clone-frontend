import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
