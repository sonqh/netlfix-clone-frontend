import { Movie, TvCast } from '@plotwist_app/tmdb'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContentStore } from '../../hooks/use-content'
import useFetchData from '../../hooks/use-fetch'
import { SMALL_IMG_BASE_URL } from '../../utils/constant'
import ArrowButton from '../buttons/arrow-button'

type MovieSliderProps = {
  category: string
}

type ContentItem = {
  success: boolean
  content: Movie[] | TvCast[]
}

const MovieSlider = ({ category }: MovieSliderProps) => {
  const { contentType } = useContentStore()

  const [showArrows, setShowArrows] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const { data } = useFetchData<ContentItem>({ endpoint: `/${contentType}/${category}` })

  const formattedCategoryName = category.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())

  const formattedContentType = contentType === 'movie' ? 'Movies' : 'TV Shows'

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div
      className='bg-black text-white relative px-5 md:px-20'
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className='mb-4 text-2xl font-bold'>
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
        {data?.content?.map((item) => (
          <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
            <div className='rounded-lg overflow-hidden'>
              <img
                src={`${SMALL_IMG_BASE_URL}${item.backdrop_path}`}
                alt={`${'title' in item ? item.title : item.name} image`}
                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
              />
            </div>
            <p className='mt-2 text-center'>{`title` in item ? item.title : item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <ArrowButton direction='left' onClick={() => scroll('left')} />
          <ArrowButton direction='right' onClick={() => scroll('right')} />
        </>
      )}
    </div>
  )
}

export default MovieSlider
