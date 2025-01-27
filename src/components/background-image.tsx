import React from 'react'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constant'

const BackgroundImage: React.FC<{ backdropPath: string }> = ({ backdropPath }) => (
  <img
    src={`${ORIGINAL_IMG_BASE_URL}${backdropPath}`}
    alt='Hero img'
    className='absolute top-0 left-0 w-full h-full -z-50 object-cover'
  />
)

export default BackgroundImage
