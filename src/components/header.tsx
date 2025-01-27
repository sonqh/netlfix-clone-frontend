import React from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  linkText?: string
  linkUrl?: string
  children?: React.ReactNode
}

const Header: React.FC<NavbarProps> = ({ linkText, linkUrl = '/', children }) => {
  return (
    <header className='mx-auto flex items-center justify-between p-4 pb-10'>
      {children}
      {linkText && (
        <>
          <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 md:w-52' />
          <Link to={linkUrl} className='text-white bg-red-600 py-1 px-2 rounded'>
            {linkText}
          </Link>
        </>
      )}
    </header>
  )
}

export default Header
