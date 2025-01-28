import axios, { AxiosRequestConfig } from 'axios'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axiosInstance from '../api/axios-instance'
import { handleError } from '../utils/error-handler'
import { usePrevious } from '@uidotdev/usehooks'

interface UseFetchDataProps<K extends object = object> {
  endpoint: string
  trigger?: K
  params?: Record<string, string>
  config?: AxiosRequestConfig
}

interface ApiError {
  message: string
  status?: number
  errors?: string[]
  [key: string]: string | number | string[] | undefined
}

const useFetchData = <T, K extends object = object>({ endpoint, trigger, params, config }: UseFetchDataProps<K>) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Cache storage
  const cache = useMemo(() => new Map<string, { data: T; timestamp: number }>(), [])

  const prevEndpoint = usePrevious(endpoint)
  const prevTrigger = usePrevious(trigger)

  /**
   * Fetches data from the specified endpoint.
   * @param fetchEndPoint - The API endpoint to fetch data from.
   * @param bypassCache - If true, ignores the cache and fetches fresh data.
   */
  const fetchData = useCallback(
    async (fetchEndPoint: string, bypassCache: boolean = false) => {
      const cacheKey = `${fetchEndPoint}-${JSON.stringify(params)}`

      // Check if data exists in the cache and bypassCache is false
      if (!bypassCache && cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey)
        if (cachedData && Date.now() - cachedData.timestamp < 1000 * 60 * 5) {
          setData(cachedData.data)
          return
        }
      }

      setIsLoading(true)
      try {
        const response = await axiosInstance.get<T>(fetchEndPoint, { params, ...config })
        setData(response.data)
        setError(null)

        // Update cache
        cache.set(cacheKey, { data: response.data, timestamp: Date.now() })
      } catch (err) {
        handleError(err, 'An unexpected error occurred while fetching data.')
        setError({
          message: 'An unexpected error occurred.',
          ...(axios.isAxiosError(err) && {
            status: err.response?.status,
            errors: err.response?.data?.errors
          })
        })
      } finally {
        setIsLoading(false)
      }
    },
    [params, config, cache]
  )

  useEffect(() => {
    const isTriggerChanged = !isEqual(prevTrigger, trigger)
    if (prevEndpoint !== endpoint || isTriggerChanged) {
      fetchData(endpoint)
    }
  }, [fetchData, endpoint, trigger, prevEndpoint, prevTrigger])

  /**
   * Deletes an item by ID and refreshes the data without using the cache.
   * @param id - The ID of the item to delete.
   */
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await axiosInstance.delete(`${endpoint}/${id}`)
        // Force refresh data without using the cache
        fetchData(endpoint, true)
      } catch (error) {
        handleError(error, 'An error occurred while deleting, please try again later.')
      }
    },
    [endpoint, fetchData]
  )

  /**
   * Forces a data refresh by bypassing the cache.
   */
  const refresh = useCallback(() => {
    fetchData(endpoint, true)
  }, [fetchData, endpoint])

  return { data, error, isLoading, handleDelete, refresh }
}

export default useFetchData
