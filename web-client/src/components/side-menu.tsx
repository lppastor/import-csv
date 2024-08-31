'use client'

import { useState } from 'react'
import { AlignJustify, ChartLine, CloudUpload } from 'lucide-react'

import { Button } from './ui/button'
import { NavItem } from './nav-item'

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
            open={open}
            Icon={CloudUpload}
            path='/'
            title='Importar arquivo CSV'
          />
          <NavItem
            open={open}
            Icon={ChartLine}
            path='/graph'
            title='Gráfico de importações'
          />
        </nav>
      </div>
    </div>
  )
}
