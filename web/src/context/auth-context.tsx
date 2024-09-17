'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'

import { api } from '~/lib/api'
import { AxiosError } from 'axios'

type User = {
  first_name: string
  last_name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')

    console.log('LOG | On AuthProvider useEffect | token: ', token)

    if (token) {
      api
        .get('/client/me')
        .then((response) => {
          setUser(response.data)
        })
        .catch((err: AxiosError) => {
          console.error(
            'ERR | On AuthProvider useEffect | catch | token: ',
            token
          )
          console.error(err.message)
          console.log('<### REMOÇÃO DE COOKIES ###>')
          // Cookies.remove('token')
        })
    }
  })

  const login = async (email: string, password: string) => {
    const response = await api.post<{ access: string }>('/client/login/', {
      email,
      password,
    })

    const { access } = response.data

    console.log('LOG | On AuthProvider login | access: ', access)

    Cookies.set('token', access)

    const userResponse = await api.get<User>('/client/me/')
    setUser(userResponse.data)

    console.log(
      'LOG | On AuthProvider login | userResponse.data: ',
      userResponse.data.email
    )
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
