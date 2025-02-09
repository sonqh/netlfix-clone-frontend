import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/_components/header'
import Skeleton from '../../components/skeletons/index'
import { useAuth } from '../../hooks/use-auth'
import { motion } from 'framer-motion'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoggingIn } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  if (isLoggingIn) {
    return <Skeleton />
  }

  return (
    <motion.div
      className='hero-bg h-screen w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='Netflix' className='w-24' />
        </Link>
      </Header>
      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md space-y-4 p-8 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-white text-center text-2xl font-bold mb-4'>Login</h1>
          <form className='space-y-4' onSubmit={handleLogin}>
            <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
              placeholder='your-email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>
              Login
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-red-500 hover:underline'>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginPage
