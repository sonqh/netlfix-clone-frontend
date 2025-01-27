import React from 'react'
import Navbar from '../../components/navbar.t'

const HomePage: React.FC = () => {
  return (
    <div className='bg-black text-white'>
      <Navbar />
      <div className='hero-bg h-screen w-full text-white flex flex-col justify-center items-center'>
        <h1>Welcome to Netflix Clone</h1>
        <p>This is the home page of the Netflix Clone application.</p>
      </div>
    </div>
  )
}

export default HomePage
