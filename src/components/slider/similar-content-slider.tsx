import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '@plotwist_app/tmdb'

interface SimilarContentSliderProps {
  similar: Movie[]
}

export const SimilarContentSlider: React.FC<SimilarContentSliderProps> = ({ similar }) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth'
      })
    }
  }

  if (similar.length === 0) {
    return null
  }

  return (
    <div className='mt-12 max-w-5xl mx-auto relative'>
      <h3 className='text-3xl font-bold mb-4'>Similar Movies/TV Shows</h3>

      <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
        {similar.map((content) => {
          if (content.poster_path === null) {
            return null
          }
          return (
            <Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
              <img
                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                alt='Poster path'
                className='w-full h-auto rounded-md'
              />
              <h4 className='mt-2 text-lg font-semibold'>{content.title}</h4>
            </Link>
          )
        })}

        <ChevronRight
          className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full'
          onClick={scrollRight}
        />
        <ChevronLeft
          className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full'
          onClick={scrollLeft}
        />
      </div>
    </div>
  )
}
