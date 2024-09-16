import { LogOut } from 'lucide-react'
import { Button } from './ui/button'

export function MainHeader() {
  return (
    <header className='bg-secondary-foreground text-secondary w-full px-10 py-3 flex justify-end'>
      <Button
        size='sm'
        className='flex items-center justify-center gap-1 hover:bg-destructive/20 hover:text-destructive'
      >
        <LogOut size='1.2em' />
        <span className='font-semibold leading-none'>Sair</span>
      </Button>
    </header>
  )
}
