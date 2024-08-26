import Link from 'next/link'
import {
  AlignJustify,
  ChartLine,
  CloudUpload,
  Icon,
  LucideIcon,
} from 'lucide-react'
import { ReactNode } from 'react'

type NavItemProps = {
  Icon: LucideIcon
  title: string
  path: string
  active?: boolean
}

function NavItem({ Icon, path, title, active = false }: NavItemProps) {
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
}

export function SideMenu() {
  return (
    <div className='relative'>
      <div className='h-dvh px-5 py-3 w-fit sticky top-0 bg-secondary-foreground text-secondary space-y-10'>
        <header className='flex items-center justify-between'>
          <h1>SISTEMA</h1>
          <AlignJustify />
        </header>
        <nav className='flex flex-col space-y-1'>
          <NavItem
            active
            Icon={CloudUpload}
            path='#'
            title='Importar arquivo CSV'
          />
          <NavItem Icon={ChartLine} path='#' title='Gráfico de importações' />
        </nav>
      </div>
    </div>
  )
}
