import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '~/components/ui/sonner'

import './globals.css'
import { AuthProvider } from '~/context/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'import-csv',
  description: 'Ferramenta rápida e eficiente para importar arquivos CSV e visualizar dados',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-br'>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
