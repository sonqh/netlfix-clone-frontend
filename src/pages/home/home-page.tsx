import React from 'react'
import AuthScreen from './auth-screen'

const HomePage: React.FC = () => {
  const user = false

  return (
    <div>
      {user ? (
        <div className='hero-bg h-screen w-full'>
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
