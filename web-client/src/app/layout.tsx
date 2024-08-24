import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SideMenu } from '~/components/side-menu'
import { MainHeader } from '~/components/main-header'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-br'>
      <body className={inter.className}>
        <div className='flex bg-secondary-foreground'>
          <SideMenu />
          <div className='flex-1 flex flex-col'>
            <MainHeader />
            <div className='flex-1 p-10 border borde-red-600 bg-background rounded-lg'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
