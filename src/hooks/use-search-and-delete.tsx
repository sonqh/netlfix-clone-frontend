import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axiosInstance from '../api/axios-instance'
import { handleError } from '../utils/error-handler'

interface SearchResults<T> {
  success: boolean
  results: T[]
  total_results: number
}

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
  // Cache storage
  const cache = useMemo(() => new Map<string, { data: T[]; timestamp: number }>(), [])

  const fetchResults = useCallback(async () => {
    if (debouncedSearchTerm.trim() === '') {
      setResults([])
      return
    }

    const cacheKey = `${endpoint}-${debouncedSearchTerm}`

    // Check if data exists in the cache
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey)
      if (cachedData && Date.now() - cachedData.timestamp < 1000 * 60 * 5) {
        setResults(cachedData.data)
        return
      }
    }

    setIsLoading(true)
    try {
      const { data } = await axiosInstance.get<SearchResults<T>>(`${endpoint}/${debouncedSearchTerm}`)

      setResults(data.results)
      setSearchHistory((prevHistory) => [...new Set([debouncedSearchTerm, ...prevHistory])])

      cache.set(cacheKey, {
        data: data.results,
        timestamp: Date.now()
      })
    } catch (error) {
      handleError(error, 'An error occurred, please try again later')
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearchTerm, endpoint, cache])

  useEffect(() => {
    fetchResults()
  }, [debouncedSearchTerm, fetchResults])

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${endpoint}/${id}`)
      await fetchResults()
    } catch (error) {
      handleError(error, 'An error occurred while deleting, please try again later')
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    results,
    isLoading,
    searchHistory,
    handleDelete
  }
}
