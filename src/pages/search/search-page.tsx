import { Movie, Person, TvSerieDetails } from '@plotwist_app/tmdb'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import Navbar from '../../components/_components/navbar'
import { SearchBar } from '../../components/_components/search-bar'
import { SearchResultItem } from '../../components/_components/search-result-item'
import { SearchTabs } from '../../components/_components/search-tabs'
import { useContentStore } from '../../hooks/use-content'
import { useSearchAndDelete } from '../../hooks/use-search-and-delete'

export type Results = Movie | TvSerieDetails | Person

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState<'movie' | 'tv' | 'person'>('movie')
  const { setContentType } = useContentStore()

  const { searchTerm, setSearchTerm, results, isLoading } = useSearchAndDelete<Results>(`/search/${activeTab}`)

  console.log('results', results)

  const handleTabChange = (tab: 'movie' | 'tv' | 'person') => {
    setActiveTab(tab)
    setContentType(tab)
  }

  return (
    <div className='hero-bg min-h-screen h-full w-full text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <SearchTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBar
          searchTerm={searchTerm}
          activeTab={activeTab}
          isLoading={isLoading}
          onSearchChange={(term) => {
            setSearchTerm(term)
          }}
        />

        {isLoading ? (
          <div className='flex justify-center'>
            <Loader className='animate-spin text-red-600 size-10' />
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {results.map((result) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  activeTab={activeTab}
                  onContentTypeChange={setContentType}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage
