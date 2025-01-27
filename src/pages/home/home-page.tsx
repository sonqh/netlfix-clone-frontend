import React, { useMemo } from 'react'
import useGetTrendingContent from '../../hooks/use-fetch-content'
import { GradientOverlay, Overlay } from '../../components/overlay'
import BackgroundImage from '../../components/background-image'
import ActionButtons from '../../components/action-buttons'
import Navbar from '../../components/navbar.t'

const HomePage: React.FC = () => {
  const { trendingContent } = useGetTrendingContent()
  const { backdrop_path, title, release_date, adult, overview, id } = useMemo(
    () =>
      trendingContent ?? {
        backdrop_path: '',
        title: '',
        release_date: '',
        adult: false,
        overview: '',
        id: ''
      },
    [trendingContent]
  )

  if (!trendingContent) {
    return (
      <div className='h-screen text-white relative'>
        <Navbar />
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
      </div>
    )
  }

  return (
    <div className='relative h-screen text-white'>
      <Navbar />
      <BackgroundImage backdropPath={backdrop_path} />
      <Overlay />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
        <GradientOverlay />
        <div className='max-w-2xl'>
          <h1 className='mt-4 text-6xl font-extrabold text-balance'>{title}</h1>
          <p className='mt-2 text-lg'>
            {release_date?.split('-')[0]} | {adult ? '18+' : 'PG-13'}
          </p>
          <p className='mt-4 text-lg'>{overview.length > 200 ? `${overview.slice(0, 200)}...` : overview}</p>
        </div>
        <ActionButtons id={`${id}`} />
      </div>
    </div>
  )
}

export default HomePage
