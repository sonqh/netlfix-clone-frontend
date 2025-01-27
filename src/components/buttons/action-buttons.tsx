import React from 'react'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'

const ActionButtons: React.FC<{ id: string }> = ({ id }) => (
  <div className='flex mt-8'>
    <Link
      to={`/watch/${id}`}
      className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'
    >
      <Play className='size-6 mr-2 fill-black' />
      Play
    </Link>
    <Link
      to={`/watch/${id}`}
      className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
    >
      <Info className='size-6 mr-2' />
      More Info
    </Link>
  </div>
)

export default ActionButtons
