import axios from 'axios'
import Cookies from 'js-cookie'
import { env } from '~/env'

export const api = axios.create({
  baseURL: `${env.API_URL}/app`,
})

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
