import React from 'react'
import Header from '../../components/_components/header'
import HeroSection from '../../components/sections/hero-section'
import ContentSection from '../../components/sections/content-section'

const LandingPage: React.FC = () => {
  return (
    <div className='hero-bg relative'>
      <Header linkText='Sign In' linkUrl='/login' />
      <HeroSection />

      <ContentSection
        title='Enjoy on your TV'
        description='Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.'
        imageSrc='/tv.png'
        videoSrc='/hero-vid.m4v'
      />

      <ContentSection
        title='Download your shows to watch offline'
        description='Save your favorites easily and always have something to watch.'
        imageSrc='/stranger-things-lg.png'
        additionalContent={
          <div
            className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
              w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2 z-30'
          >
            <img src='/stranger-things-sm.png' alt='Stranger Things' className='h-full' />
            <div className='flex justify-between items-center w-full'>
              <div className='flex flex-col gap-0'>
                <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                <span className='text-sm text-blue-500'>Downloading...</span>
              </div>
              <img src='/download-icon.gif' alt='Downloading' className='h-12' />
            </div>
          </div>
        }
        isReversed
      />

      <ContentSection
        title='Watch everywhere'
        description='Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.'
        imageSrc='/device-pile.png'
        videoSrc='/video-devices.m4v'
        videoClassName='top-2 left-1/2 -translate-x-1/2 h-4/6 max-w-[63%]'
      />

      <ContentSection
        title='Create profiles for kids'
        description='Send kids on adventures with their favorite characters in a space made just for them—free with your membership.'
        imageSrc='/kids.png'
        isReversed
      />
    </div>
  )
}

export default LandingPage
