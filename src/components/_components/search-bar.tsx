import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string
  activeTab: 'movie' | 'tv' | 'person'
  isLoading: boolean
  onSearchChange: (term: string) => void
}

export const SearchBar = ({ searchTerm, activeTab, isLoading, onSearchChange }: SearchBarProps) => (
  <div className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto'>
    <input
      type='text'
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={`Search for a ${activeTab}`}
      className='w-full p-2 rounded bg-gray-800 text-white'
    />
    <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded' disabled={isLoading}>
      <Search className='size-6' />
    </button>
  </div>
)
