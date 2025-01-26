import React from 'react'

interface ContentSectionProps {
  title: string
  description: string
  imageSrc: string
  videoSrc?: string
  isReversed?: boolean
  additionalContent?: React.ReactNode
  videoClassName?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  imageSrc,
  videoSrc,
  isReversed,
  additionalContent,
  videoClassName
}) => (
  <div className={`py-10 bg-black text-white`}>
    <div
      className={`flex max-w-6xl mx-auto items-center justify-center ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col px-4 md:px-2`}
    >
      <div className={`flex-1 ${isReversed ? 'md:text-left text-center' : 'text-center md:text-left'}`}>
        <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>{title}</h2>
        <p className='text-lg md:text-xl'>{description}</p>
      </div>
      <div className='flex-1 relative'>
        <img src={imageSrc} alt='section image' className='mt-4 z-20 relative' />
        {videoSrc && (
          <video
            className={`absolute z-10 ${videoClassName ? videoClassName : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2'}`}
            playsInline
            autoPlay
            muted
            loop
          >
            <source src={videoSrc} type='video/mp4' />
          </video>
        )}
        {additionalContent}
      </div>
    </div>
  </div>
)

export default ContentSection
