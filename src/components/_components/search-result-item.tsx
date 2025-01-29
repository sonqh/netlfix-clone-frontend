import { Link } from 'react-router-dom'
import { Movie, Person, TvSerieDetails } from '@plotwist_app/tmdb'
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constant'
import { MediaType } from '@plotwist_app/tmdb/dist/utils/with_media_type'

interface SearchResultItemProps {
  result: Movie | TvSerieDetails | Person
  activeTab: 'movie' | 'tv' | 'person'
  onContentTypeChange: (type: MediaType) => void
}

export const SearchResultItem = ({ result, activeTab, onContentTypeChange }: SearchResultItemProps) => {
  const isPerson = 'profile_path' in result
  const isMovieOrTv = 'poster_path' in result

  if (isPerson && activeTab === 'person') {
    return (
      <div className='bg-gray-800 p-4 rounded'>
        <div className='flex flex-col items-center'>
          <img
            src={ORIGINAL_IMG_BASE_URL + result.profile_path}
            alt={result.name}
            className='max-h-96 rounded mx-auto'
          />
          <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
        </div>
      </div>
    )
  }

  if (isMovieOrTv && activeTab !== 'person') {
    return (
      <div className='bg-gray-800 p-4 rounded'>
        <Link to={`/watch/${result.id}`} onClick={() => onContentTypeChange(activeTab)}>
          <img
            src={ORIGINAL_IMG_BASE_URL + result.poster_path}
            alt={'title' in result ? result.title : result.name}
            className='w-full h-auto rounded'
          />
          <h2 className='mt-2 text-xl font-bold'>{'title' in result ? result.title : result.name}</h2>
        </Link>
      </div>
    )
  }

  return null
}
