import { usePrevious } from '@uidotdev/usehooks'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axios-instance'
import { handleError } from '../utils/error-handler'

interface UseFetchDataProps {
  endpoint: string
  params?: Record<string, string>
  config?: AxiosRequestConfig
}

interface ApiError {
  message: string
  status?: number
  errors?: string[]
  [key: string]: string | number | string[] | undefined
}

const useFetchData = <T>({ endpoint }: UseFetchDataProps) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const prevEndpoint = usePrevious(endpoint)

  const fetchData = useCallback(async (fetchEndPoint: string) => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get<T>(fetchEndPoint)
      setData(response.data)
      setError(null)
    } catch (err) {
      let apiError: ApiError = { message: 'An unexpected error occurred.' }
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ errors: string[] }>
        if (axiosError.response && axiosError.response.data) {
          apiError = {
            message: Array.isArray(axiosError.response.data.errors)
              ? axiosError.response.data.errors.join(', ')
              : (axiosError.response.data.errors ?? 'An unexpected error occurred.'),
            status: axiosError.response.status,
            ...axiosError.response.data
          }
        } else if (axiosError.message) {
          apiError.message = axiosError.message
          apiError.code = axiosError.code
        }
      }
      if (apiError.code !== 'ERR_CANCELED') {
        toast.error(apiError.message)
        setError(apiError)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (prevEndpoint !== endpoint) {
      fetchData(endpoint)
    }
  }, [fetchData, endpoint, prevEndpoint])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${endpoint}/${id}`)
      await fetchData(endpoint)
    } catch (error) {
      handleError(error, 'An error occurred while deleting, please try again later')
    }
  }

  return { data, error, isLoading, handleDelete }
}

export default useFetchData
