import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

// Pending requests map
const pendingRequests = new Map<string, AbortController>()

// Generate unique key for each request
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// Add request to pendingRequests map
const addPendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config)

  // Abort existing request if it exists
  if (pendingRequests.has(requestKey)) {
    const controller = pendingRequests.get(requestKey)
    controller?.abort()
  }

  // Create a new AbortController for the current request
  const controller = new AbortController()
  config.signal = controller.signal

  // Store the controller in pendingRequests
  pendingRequests.set(requestKey, controller)
}

// Remove request from pendingRequests map
const removePendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

// Request interceptor
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  addPendingRequest(config)
  return config
})

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Remove request from pendingRequests after successful response
    removePendingRequest(response.config)
    return response
  },
  (error) => {
    // Remove request from pendingRequests on error
    if (error.config) {
      removePendingRequest(error.config)
    }

    // Handle specific error cases
    if (axios.isCancel(error)) {
      console.info('Request canceled:', error.message) // Expected behavior
    } else if (error.code === 'ERR_CANCELED') {
      console.warn('Request aborted:', error.message)
    } else {
      console.error('Request failed:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
