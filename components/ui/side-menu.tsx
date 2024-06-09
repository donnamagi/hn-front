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
  isInner,
  className,
  children
}: SideMenuProps) {
  return (
    <ScrollArea
      className={cn(
        'hidden bg-neutral-50 lg:flex lg:flex-col lg:border-r',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-40 xl:w-60',
        className
      )}
    >
      <div className='bg-slate-50 px-3'>{children}</div>
    </ScrollArea>
  )
}
