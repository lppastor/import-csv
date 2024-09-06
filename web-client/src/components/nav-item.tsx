'use client'

import Link from 'next/link'
import { cva } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { cn } from '~/lib/utils'

type NavItemProps = {
  Icon: LucideIcon
  title: string
  path: string
  open: boolean
}

const linkVariants = cva('flex items-center group', {
  variants: {
    open: {
      true: 'gap-1',
    },
  },
})

const leftMarkerVariants = cva('h-7 rounded-full', {
  variants: {
    active: {
      true: 'bg-secondary',
    },
    open: {
      true: 'w-1',
      false: 'hidden',
    },
  },
})

const itemContentContainerVariants = cva(
  'flex items-center gap-2 p-1 px-2 rounded-lg w-full group-hover:bg-secondary/20',
  {
    variants: {
      active: {
        true: 'bg-secondary/10',
      },
    },
  }
)

const iconVariant = cva('text-secondary/60', {
  variants: {
    open: { false: 'text-2xl' },
    active: { true: '' },
  },
  compoundVariants: [
    {
      active: true,
      open: false,
      class: 'text-secondary',
    },
  ],
})

const labelVariant = cva('text-secondary font-semibold', {
  variants: {
    open: {
      false: 'hidden',
    },
  },
})

export function NavItem({ Icon, path, title, open }: NavItemProps) {
  const pathname = usePathname()

  const active = pathname === path

  return (
    <Link href={path} className={cn(linkVariants({ open }))}>
      <div
        className={cn(
          leftMarkerVariants({
            active,
            open,
          })
        )}
      />

      <div
        data-active={active}
        className={cn(itemContentContainerVariants({ active }))}
      >
        <Icon size='1em' className={cn(iconVariant({ active, open }))} />
        <span className={cn(labelVariant({ open }))}>{title}</span>
      </div>
    </Link>
  )
}
