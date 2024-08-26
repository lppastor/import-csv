'use client'

import Link from 'next/link'
import { AlignJustify, ChartLine, CloudUpload, LucideIcon } from 'lucide-react'

import { Button } from './ui/button'
import { useState } from 'react'

type NavItemProps = {
  Icon: LucideIcon
  title: string
  path: string
  open: boolean
  active?: boolean
}

function NavItem({ Icon, path, title, open, active = false }: NavItemProps) {
  if (open) {
    return (
      <Link href={path} className='flex items-center gap-1 group'>
        <div
          data-active={active}
          className='h-7 rounded-full w-1 data-[active="true"]:bg-secondary'
        />
        <div
          data-active={active}
          className='flex items-center gap-2 data-[active="true"]:bg-secondary/10 p-1 px-2 rounded-lg w-full group-hover:bg-secondary/20 transition-colors'
        >
          <Icon size='1em' className='text-secondary/60' />
          <span className='text-secondary font-semibold'>{title}</span>
        </div>
      </Link>
    )
  } else {
    return (
      <Link href={path} className='group'>
        <div
          data-active={active}
          className='flex items-center gap-2 data-[active="true"]:bg-secondary/10 p-1 px-2 rounded-lg w-full group-hover:bg-secondary/20 transition-colors'
        >
          <Icon
            data-active={active}
            size='1.5em'
            className='text-secondary/60 data-[active="true"]:text-secondary'
          />
        </div>
      </Link>
    )
  }
}

export function SideMenu() {
  const [open, setOpen] = useState(true)

  const toggleOpen = () => setOpen((prev) => !prev)

  return (
    <div className='relative'>
      <div className='h-dvh px-5 py-2 w-fit sticky top-0 bg-secondary-foreground text-secondary space-y-10'>
        <header
          data-open={open}
          className='flex items-center justify-center data-[open="true"]:justify-between'
        >
          {open && <h1>SISTEMA</h1>}
          <Button
            onClick={toggleOpen}
            className='h-fit w-fit p-1 hover:bg-secondary/10'
          >
            <AlignJustify />
          </Button>
        </header>
        <nav className='flex flex-col space-y-1'>
          <NavItem
            active
            open={open}
            Icon={CloudUpload}
            path='#'
            title='Importar arquivo CSV'
          />
          <NavItem
            open={open}
            Icon={ChartLine}
            path='#'
            title='Gráfico de importações'
          />
        </nav>
      </div>
    </div>
  )
}
