import { formatReleaseDate } from '../utils/date-format'

interface ContentDetailsProps {
  detail: {
    title?: string
    name?: string
    release_date?: string
    first_air_date?: string
    adult: boolean
    overview: string
    poster_path: string
  }
}

export const ContentDetails: React.FC<ContentDetailsProps> = ({ detail }) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
      <div className='mb-4 md:mb-0'>
        <h2 className='text-5xl font-bold text-balance'>{detail.title || detail.name}</h2>
        <p className='mt-2 text-lg'>
          {formatReleaseDate(detail.release_date || detail.first_air_date || '')} |{' '}
          {detail.adult ? <span className='text-red-600'>18+</span> : <span className='text-green-600'>PG-13</span>}
        </p>
        <p className='mt-4 text-lg'>{detail.overview}</p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${detail.poster_path}`}
        alt='Poster image'
        className='max-h-[600px] rounded-md'
      />
    </div>
  )
}
