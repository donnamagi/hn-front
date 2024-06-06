'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/Scrollarea'

interface SideMenuProps {
  title?: string
  isInner?: boolean
  links?: { href: string; label: string }[]
  className?: string
}

const LINKS = [
  { href: '/', label: 'Best' },
  { href: '/top', label: 'Top' },
  { href: '/new', label: 'New' },
  { href: '/ask', label: 'Ask HN' },
  { href: '/show', label: 'Show HN' },
  { href: '/jobs', label: 'Jobs' }
]

export const SideMenu = ({
  title,
  isInner,
  links,
  className
}: SideMenuProps) => {
  return (
    <ScrollArea
      className={cn(
        'hidden bg-slate-50 lg:flex lg:flex-col lg:border-r',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72',
        className
      )}
    >
      {title && (
        <div className='sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-semibold tracking-tight'>
              {title}
            </span>
            <div className='flex items-center gap-2'></div>
          </div>
        </div>
      )}
      <div className='bg-zinc-50 p-3 h-dvh'>
        <div className='flex w-full flex-col text-sm'>
          <div className='flex flex-col gap-4'>
            <Link
              href='/'
              className='link-card inline-flex items-center gap-2 p-2'
            >
              <div className='flex flex-col'>
                <span className='font-semibold tracking-tight'>HN</span>
              </div>
            </Link>
            <div className='flex flex-col gap-1'>
              {LINKS.map((link, linkIndex) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
