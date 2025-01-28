import { useDebounce } from '@uidotdev/usehooks'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { handleError } from '../utils/error-handler'

interface UseSearchAndDeleteReturn<T> {
  searchTerm: string
  setSearchTerm: (term: string) => void
  results: T[]
  isLoading: boolean
  searchHistory: string[]
  handleDelete: (id: string) => Promise<void>
}

export const useSearchAndDelete = <T extends object>(endpoint: string): UseSearchAndDeleteReturn<T> => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const fetchResults = useCallback(async () => {
    if (debouncedSearchTerm.trim() === '') {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const res = await axios.get<{ content: T[] }>(`${endpoint}/${debouncedSearchTerm}`)
      setResults(res.data.content)
      setSearchHistory((prevHistory) => [...new Set([debouncedSearchTerm, ...prevHistory])])
    } catch (error) {
      handleError(error, 'An error occurred, please try again later')
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearchTerm, endpoint])

  useEffect(() => {
    fetchResults()
  }, [debouncedSearchTerm, fetchResults])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${endpoint}/${id}`)
      await fetchResults()
    } catch (error) {
      handleError(error, 'An error occurred while deleting, please try again later')
    }
  }

  return { searchTerm, setSearchTerm, results, isLoading, searchHistory, handleDelete }
}
