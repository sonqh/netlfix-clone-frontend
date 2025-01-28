import axios from 'axios'
import toast from 'react-hot-toast'

export const handleError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') {
      return
    }

    if (error.response) {
      const message = error.response.data?.message || defaultMessage
      toast.error(message)
    } else if (error.request) {
      toast.error('Network error. Please check your connection.')
    } else {
      toast.error(defaultMessage)
    }
  } else {
    toast.error(defaultMessage)
  }
}
