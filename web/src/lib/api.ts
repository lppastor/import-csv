import axios from 'axios'
import { cookies } from 'next/headers'
import { env } from '~/env'

export const api = axios.create({
  baseURL: `${env.API_URL}/app`,
})

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to redirect to login if token is invalid
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // redirect to login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
