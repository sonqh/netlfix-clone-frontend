import { ChevronLeft, ChevronRight } from 'lucide-react'

type ArrowButtonProps = {
  direction: 'left' | 'right'
  onClick: () => void
}

const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => (
  <button
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === 'left' ? 'left-5 md:left-24' : 'right-5 md:right-24'
    } flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10`}
    onClick={onClick}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </button>
)

export default ArrowButton
