import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { v4 as uuidv4 } from 'uuid'

const axiosInstance = axios.create({
  baseURL: `/api/${import.meta.env.VITE_API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

// Map to track pending requests
const pendingRequests = new Map<string, AbortController>()

// Generate a unique key for each request
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// Add request to the pendingRequests map
const addPendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config)

  // If the request already exists, abort the previous one
  if (pendingRequests.has(requestKey)) {
    const existingController = pendingRequests.get(requestKey)
    existingController?.abort()
  }

  // Create a new AbortController for the current request
  const controller = new AbortController()
  config.signal = controller.signal

  // Store the controller in the pendingRequests map
  pendingRequests.set(requestKey, controller)
}

// Remove a request from the pendingRequests map
const removePendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey = generateRequestKey(config)
  pendingRequests.delete(requestKey) // Safe to delete even if the key doesn't exist
}

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    addPendingRequest(config) // Track the current request

    // Add Idempotency-Key
    config.headers['Idempotency-Key'] = uuidv4()

    return config
  },
  (error) => {
    // Handle errors in the request configuration phase
    return Promise.reject(error)
  }
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Remove the request from the map after a successful response
    removePendingRequest(response.config)
    return response
  },
  (error) => {
    // Remove the request from the map in case of an error
    if (error.config) {
      removePendingRequest(error.config)
    }

    // If the error is due to cancellation, handle it gracefully
    if (axios.isCancel(error)) {
      console.log('Request cancelled:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
