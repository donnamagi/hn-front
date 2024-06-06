'use client'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SideMenuProps {
  title?: string
  isInner?: boolean
  className?: string
  children: React.ReactNode
}

export default function Sidemenu({
  title,
  isInner,
  className,
  children
}: SideMenuProps) {
  return (
    <ScrollArea
      className={cn(
        'hidden bg-slate-50 lg:flex lg:flex-col lg:border-r',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-40 xl:w-60',
        className
      )}
    >
      {title && (
        <div className='sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-semibold tracking-tight'>
              {title}
            </span>
          </div>
        </div>
      )}
      <div className='bg-slate-50 p-3'>{children}</div>
    </ScrollArea>
  )
}
