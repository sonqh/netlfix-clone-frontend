type VideoProps = {
  src: string
  className?: string
}

const Video = ({ src, className }: VideoProps) => {
  return (
    <video className={`absolute z-10 max-w-[63%] ${className}`} playsInline autoPlay={true} muted loop>
      <source src={src} type='video/mp4' />
    </video>
  )
}

export default Video
