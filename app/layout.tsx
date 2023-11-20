import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import Providers from './components/Providers'

const quicksand = Quicksand({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EI Social Media',
  description: 'Basic social media site created by einann',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

// Wrapping entire application inside a client component DOESN'T transform the server component children into client components.