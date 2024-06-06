import { cn } from '@/lib/utils'

interface ScrollAreaProps {
  className?: string
  children: React.ReactNode
}

export const ScrollArea = ({ className, children }: ScrollAreaProps) => (
  <div
    className={cn('scrollable-area relative flex w-full flex-col', className)}
  >
    {children}
  </div>
)
