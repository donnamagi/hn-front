'use client'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SideMenuProps {
  title?: string
  isInner?: boolean
  className?: string
  children: React.ReactNode
}

export default function SideMenu({
  isInner,
  className,
  children
}: SideMenuProps) {
  return (
    <ScrollArea
      className={cn(
        ' bg-neutral-50 flex flex-col border-r',
        isInner
          ? 'w-0 md:w-60 lg:w-80 xl:w-2/5 w-max-xl'
          : 'w-20 md:w-30 xl:w-56',
        className
      )}
    >
      <div className='bg-slate-50 px-3 text-sm'>{children}</div>
    </ScrollArea>
  )
}
