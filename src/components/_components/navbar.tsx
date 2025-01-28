import { Link } from 'react-router-dom'
import { LogOut, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useContentStore } from '../../hooks/use-content'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { setContentType } = useContentStore()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className='relative mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
        </Link>

        {/* desktop navbar items */}
        <div className='hidden sm:flex gap-3 items-center'>
          <Link to='/' className='hover:underline' onClick={() => setContentType('movie')}>
            Movies
          </Link>
          <Link to='/' className='hover:underline' onClick={() => setContentType('tv')}>
            TV Shows
          </Link>
          <Link to='/history' className='hover:underline'>
            Search History
          </Link>
        </div>
      </div>

      <div className='flex gap-3 items-center z-50'>
        <Link to={'/search'}>
          <Search className='size-6 cursor-pointer' />
        </Link>
        <img src={user?.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
        <LogOut className='size-6 cursor-pointer' onClick={logout} />
        <div className='sm:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className='absolute top-full left-0 w-full sm:hidden mt-0 z-50 bg-black bg-opacity-90 border-t border-gray-800 transition transform duration-300 ease-in-out'>
          <Link to='/' className='block text-white hover:bg-gray-700 px-4 py-2 transition' onClick={toggleMobileMenu}>
            Movies
          </Link>
          <Link to='/' className='block text-white hover:bg-gray-700 px-4 py-2 transition' onClick={toggleMobileMenu}>
            TV Shows
          </Link>
          <Link
            to='/history'
            className='block text-white hover:bg-gray-700 px-4 py-2 transition'
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  )
}
export default Navbar
