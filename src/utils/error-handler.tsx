import axios from 'axios'
import toast from 'react-hot-toast'

export const handleError = (error: unknown, defaultMessage: string) => {
  if (axios.AxiosError.ERR_CANCELED) {
    return
  }

  if (axios.isAxiosError(error) && error.response?.data?.message) {
    toast.error(error.response.data.message)
  } else {
    toast.error(defaultMessage)
  }
}
