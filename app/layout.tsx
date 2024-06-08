import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideMenu from '@/components/ui/side-menu'
import { MainMenu } from '@/components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://hackernews.news'),
  robots: {
    index: true,
    follow: true
  },
  title: 'Hacker News Clone',
  description: 'A more intuitive UI for Hacker News',
  keywords: ['hn clone', 'hn', 'hackernews', 'hacker news'],
  openGraph: {
    title: 'Hacker News clone',
    description: 'A more intuitive UI for Hacker News',
    url: 'https://hackernews.news',
    siteName: 'Hacker News Clone',
    locale: 'en_IE',
    type: 'website'
  }
}

export const viewport = {
  themeColor: 'white',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='min-h-screen bg-white'>
          <div className='lg:flex h-dvh'>
            <SideMenu className='relative hidden lg:flex'>
              <MainMenu />
            </SideMenu>
            <div className='flex flex-1'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  )
}
