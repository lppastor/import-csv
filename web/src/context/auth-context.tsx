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

    if (token) {
      api
        .get('/client/me')
        .then((response) => {
          setUser(response.data)
        })
        .catch(() => {
          Cookies.remove('token')
        })
    }
  })

  const login = async (email: string, password: string) => {
    const response = await api.post<{ access: string }>('/client/login/', {
      email,
      password,
    })

    const { access } = response.data

    Cookies.set('token', access)

    const userResponse = await api.get<User>('/client/me/')
    setUser(userResponse.data)
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
