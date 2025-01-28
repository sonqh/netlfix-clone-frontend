import { Loader, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie, Person, TvShowDetails } from 'tmdb-ts'
import Navbar from '../components/navbar.t'
import { useContentStore } from '../hooks/use-content'
import { useSearchAndDelete } from '../hooks/use-search-and-delete'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constant'

export type SearchResult = Movie | TvShowDetails | Person

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState<'movie' | 'tv' | 'person'>('movie')
  const { setContentType } = useContentStore()

  const { searchTerm, setSearchTerm, results, isLoading } = useSearchAndDelete<SearchResult>(
    `/api/v1/search/${activeTab}`
  )

  const handleTabClick = (tab: 'movie' | 'tv' | 'person') => {
    setActiveTab(tab)
    setContentType(tab)
  }

  const isPerson = (result: SearchResult): result is Person => 'profile_path' in result
  const isMovieOrTv = (result: SearchResult): result is Movie | TvShowDetails => 'poster_path' in result

  return (
    <div className='hero-bg h-screen w-full text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center gap-3 mb-4'>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
            onClick={() => handleTabClick('movie')}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
            onClick={() => handleTabClick('tv')}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'person' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
            onClick={() => handleTabClick('person')}
          >
            Person
          </button>
        </div>

        <div className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className='w-full p-2 rounded bg-gray-800 text-white'
          />
          <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded' disabled={isLoading}>
            <Search className='size-6' />
          </button>
        </div>

        {isLoading ? (
          <div className='flex justify-center'>
            <Loader className='animate-spin text-red-600 size-10' />
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {results.map((result) => {
              if (isPerson(result) && activeTab === 'person') {
                return (
                  <div key={result.id} className='bg-gray-800 p-4 rounded'>
                    <div className='flex flex-col items-center'>
                      <img
                        src={ORIGINAL_IMG_BASE_URL + (result.profile_path || '/fallback-profile.png')}
                        alt={result.name}
                        className='max-h-96 rounded mx-auto'
                      />
                      <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                    </div>
                  </div>
                )
              }

              if (isMovieOrTv(result) && activeTab !== 'person') {
                return (
                  <div key={result.id} className='bg-gray-800 p-4 rounded'>
                    <Link
                      to={`/watch/${result.id}`}
                      onClick={() => {
                        setContentType(activeTab)
                      }}
                    >
                      <img
                        src={ORIGINAL_IMG_BASE_URL + (result.poster_path || '/fallback-poster.png')}
                        alt={'title' in result ? result.title : result.name}
                        className='w-full h-auto rounded'
                      />
                      <h2 className='mt-2 text-xl font-bold'>{'title' in result ? result.title : result.name}</h2>
                    </Link>
                  </div>
                )
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
