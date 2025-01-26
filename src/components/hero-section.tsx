import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/signup?email=' + email)
  }

  return (
    <div className='flex flex-col items-center justify-center text-center py-40 text-white mx-auto'>
      <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, TV shows, and more</h1>
      <p className='text-lg mb-4'>Watch anywhere. Cancel anytime.</p>
      <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>

      <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
        <input
          type='email'
          placeholder='Email address'
          className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
          Get Started
          <ChevronRight className='size-8 md:size-10' />
        </button>
      </form>
    </div>
  )
}

export default HeroSection
