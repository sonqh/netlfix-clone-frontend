import { Trash } from 'lucide-react'
import useFetchData from '../hooks/use-fetch'
import { SMALL_IMG_BASE_URL } from '../utils/constant'
import { formatDate } from '../utils/date-format'
import Navbar from '../components/_components/navbar'

type SearchHistoryEntry = {
  id: string
  image: string
  title: string
  createdAt: string
  searchType: 'movie' | 'tv' | 'person'
}

type ContentItem = {
  success: boolean
  content: SearchHistoryEntry[]
}

const SearchHistoryPage: React.FC = () => {
  const { data, handleDelete } = useFetchData<ContentItem>({ endpoint: '/api/v1/search/history' })

  if (data?.content?.length === 0) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-8'>Search History</h1>
          <div className='flex justify-center items-center h-96'>
            <p className='text-xl'>No search history found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Search History</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {data?.content?.map((entry) => (
            <div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start'>
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt='History image'
                className='h-16 w-16 rounded-full object-cover mr-4'
              />
              <div className='flex flex-col'>
                <span className='text-white text-lg'>{entry.title}</span>
                <span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
              </div>

              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === 'movie'
                    ? 'bg-red-600'
                    : entry.searchType === 'tv'
                      ? 'bg-blue-600'
                      : 'bg-green-600'
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash
                className='h-5 w-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
                onClick={() => handleDelete(entry.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchHistoryPage
