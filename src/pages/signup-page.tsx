import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, username, password })
  }

  return (
    <div className='hero-bg h-screen w-full'>
      <header className=' mx-auto flex items-center justify-between p-4'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='Netflix' className='w-24' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md space-y-4 p-8 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-white text-center text-2xl font-bold mb-4'>SignUp</h1>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none foucs:ring'
              placeholder='your-email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
              UserName
            </label>
            <input
              type='username'
              id='username'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none foucs:ring'
              placeholder='johndoe'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
              password
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none foucs:ring'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>
              Signup
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Already have an account?{' '}
            <Link to='/login' className='text-red-600 hover:underline'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
