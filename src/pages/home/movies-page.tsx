import React, { useMemo } from 'react'
import { Movie } from '@plotwist_app/tmdb'
import ActionButtons from '../../components/buttons/action-buttons'
import { GradientOverlay, Overlay } from '../../components/_components/overlay'
import MovieSlider from '../../components/slider/movie'
import useFetchData from '../../hooks/use-fetch'
import { MOVIE_CATEGORIES } from '../../utils/constant'
import Navbar from '../../components/_components/navbar'
import BackgroundImage from '../../components/_components/background-image'
import { motion } from 'framer-motion'

type ContentItem = {
  success: boolean
  content: Movie
}

const MoviesPage: React.FC = () => {
  const { data, isLoading } = useFetchData<ContentItem>({ endpoint: `/movie/trending` })

  const { backdrop_path, title, release_date, adult, overview, id } = useMemo(
    () =>
      data?.content ?? {
        backdrop_path: '',
        title: '',
        release_date: '',
        adult: false,
        overview: '',
        id: ''
      },
    [data?.content]
  )

  if (isLoading) {
    return (
      <div className='h-screen text-white relative'>
        <Navbar />
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
      </div>
    )
  }

  return (
    <>
      <motion.div
        className='relative h-screen text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <BackgroundImage backdropPath={backdrop_path ?? ''} />
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
      </motion.div>
      <div className='flex flex-col gap-10 bg-black py-10'>
        {MOVIE_CATEGORIES.map((category) => (
          <MovieSlider key={category} category={category} contentType='movie' />
        ))}
      </div>
    </>
  )
}

export default MoviesPage
