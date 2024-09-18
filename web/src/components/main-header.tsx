'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

import { useAuth } from '~/context/auth-context'

import { Button } from './ui/button'

export function MainHeader() {
  const router = useRouter()
  const { logout, user } = useAuth()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <header className='bg-secondary-foreground text-secondary w-full px-10 py-3 flex justify-end items-center gap-2'>
      <span className='text-muted-foreground'>
        {user?.first_name} {user?.last_name}
      </span>

      <Button
        size='sm'
        onClick={handleLogout}
        className='flex items-center justify-center gap-1 hover:bg-destructive/20 hover:text-destructive'
      >
        <LogOut size='1.2em' />
        <span className='font-semibold leading-none'>Sair</span>
      </Button>
    </header>
  )
}
