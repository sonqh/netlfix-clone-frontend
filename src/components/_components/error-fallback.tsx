import { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GradientOverlay, Overlay } from './overlay'

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative'
      style={{ backgroundImage: `url('/error-background.png')` }}
    >
      <Overlay />
      <GradientOverlay />
      <header className='absolute top-0 left-0 p-4 w-full z-50'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='Netflix' className='h-8' />
        </Link>
      </header>
      <motion.div
        className='p-6 bg-black/70 rounded-lg shadow-lg text-center z-10'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-2xl font-bold mb-4'>Something went wrong</h2>
        <p className='mb-6'>{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
        >
          Try Again
        </button>
      </motion.div>
    </div>
  )
}
