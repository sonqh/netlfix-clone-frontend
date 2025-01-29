import { useParams } from 'react-router-dom'
import { useContentStore } from '../hooks/use-content'
import useFetchData from '../hooks/use-fetch'

import Skeleton from '../components/skeletons'
import { Movie } from '@plotwist_app/tmdb'
import { TrailerSection } from '../components/sections/trailer-section'
import { ContentDetails } from '../components/content-details'
import { SimilarContentSlider } from '../components/slider/similar-content-slider'
import Navbar from '../components/_components/navbar'

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

type Movies = {
  similar: Movie[]
  success: boolean
}

type Content = {
  detail: {
    id: number
    title?: string
    name?: string
    release_date?: string
    first_air_date?: string
    adult: boolean
    overview: string
    poster_path: string
  }
  success: boolean
}

const WatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { contentType } = useContentStore()

  const { data: trailersData } = useFetchData<{ trailers: Trailer[] }>({
    endpoint: `/${contentType}/${id}/trailers`
  })

  const { data: similarContent } = useFetchData<Movies>({
    endpoint: `/${contentType}/${id}/similar`
  })

  const { data: content, isLoading } = useFetchData<Content>({
    endpoint: `/${contentType}/${id}/details`
  })

  if (isLoading) {
    return (
      <div className='min-h-screen bg-black p-10'>
        <Skeleton />
      </div>
    )
  }

  if (!content?.detail) {
    return (
      <div className='bg-black text-white h-screen'>
        <div className='max-w-6xl mx-auto'>
          <Navbar />
          <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
            <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='mx-auto container px-4 py-8 h-full'>
        <Navbar />

        {trailersData?.trailers && <TrailerSection trailers={trailersData.trailers} />}

        <ContentDetails detail={content.detail} />

        {similarContent?.similar && <SimilarContentSlider similar={similarContent.similar} />}
      </div>
    </div>
  )
}

export default WatchPage
