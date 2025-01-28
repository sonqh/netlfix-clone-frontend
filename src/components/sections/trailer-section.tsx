import { ChevronLeft, ChevronRight } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useState } from 'react'

type Trailer = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

interface TrailerSectionProps {
  trailers: Trailer[]
}

export const TrailerSection: React.FC<TrailerSectionProps> = ({ trailers }) => {
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState<number>(0)

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1)
    }
  }

  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1)
    }
  }

  if (trailers.length === 0) {
    return <h2 className='text-xl text-center mt-5'>No trailers available 😥</h2>
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <button
          className={`
            bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
              currentTrailerIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }
          `}
          disabled={currentTrailerIdx === 0}
          onClick={handlePrev}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className={`
            bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
              currentTrailerIdx === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }
          `}
          disabled={currentTrailerIdx === trailers.length - 1}
          onClick={handleNext}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
        <ReactPlayer
          controls={true}
          width={'100%'}
          height={'70vh'}
          className='mx-auto overflow-hidden rounded-lg'
          url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
        />
      </div>
    </div>
  )
}
