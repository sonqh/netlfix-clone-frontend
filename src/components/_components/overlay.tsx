import React from 'react'

export const GradientOverlay: React.FC = () => (
  <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />
)

export const Overlay: React.FC = () => (
  <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />
)
