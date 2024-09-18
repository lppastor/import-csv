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
import { toast } from 'sonner'

type User = {
  first_name: string
  last_name: string
  email: string
}

type RegisterData = {
  first_name: string
  last_name: string
  email: string
  password: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      api
        .get('/client/me/')
        .then((response) => {
          setUser(response.data)
        })
        .catch((err: AxiosError) => {
          console.error(err.status)
          console.error(err.message)
          Cookies.remove('token')
        })
    }
  }, [])

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

  const register = async (data: RegisterData) => {
    try {
      const response = await api.post<{ access_token: string }>(
        '/client/register_client/',
        data
      )

      if (response.status === 201) {
        const { access_token } = response.data

        Cookies.set('token', access_token)

        const userResponse = await api.get<User>('/client/me/')

        setUser(userResponse.data)
      } else {
        toast.error(`Erro ao registrar usuário: ${response.statusText}`)
        throw new Error(
          `Erro ao registrar usuário | ${response.statusText} | ${response.data}`
        )
      }
    } catch (err) {
      toast.error('Erro ao registrar usuário')
      throw err
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
