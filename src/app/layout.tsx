import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './_trpc/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Concurrent Worker Queues Demo',
  description: 'Proof of concept for a client/server worker queue system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
