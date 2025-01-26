import React from 'react'
import AuthScreen from './auth-screen'
import { useAuthStore } from '../../store/auth-user'

const HomePage: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <div>
      {user ? (
        <div className='hero-bg h-screen w-full text-white flex flex-col justify-center items-center'>
          <h1>Welcome to Netflix Clone</h1>
          <p>This is the home page of the Netflix Clone application.</p>
        </div>
      ) : (
        <AuthScreen />
      )}
    </div>
  )
}

export default HomePage
