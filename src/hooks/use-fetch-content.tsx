import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Movie } from 'tmdb-ts'
import { useContentStore } from './use-content'

const useGetTrendingContent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const { contentType } = useContentStore()
  const [trendingContent, setTrendingContent] = useState<Movie | null>(null)

  const getTrendingContent = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`/api/v1/${contentType}/trending`)
      setTrendingContent(res.data.content)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [contentType])

  useEffect(() => {
    getTrendingContent()
  }, [getTrendingContent])

  return { trendingContent, loading, error }
}
export default useGetTrendingContent
