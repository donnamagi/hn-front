import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { get } from 'http'

const badgeVariants = cva(
  'whitespace-nowrap px-2 py-1 rounded-full border border-primary text-primary text-xs font-medium transition-all ease-in-out duration-200 overflow-hidden',
  {
    variants: {
      variant: {
        interactive: '',
        default: ''
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeVariants> {
  interests?: string[]
  keyword: string
}

const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>(
  ({ className, variant, children, interests, keyword, ...props }, ref) => {
    const renderContent = () => {
      if (variant === 'interactive') {
        return (
          <span className='inline-block mr-[-17px] hover:mr-0 transition-margin duration-200 ease-in-out'>
            {children}
            {getIcon()}
          </span>
        )
      } else {
        return children
      }
    }

    const getIcon = () => {
      return (
        <span className='ml-2 text-md transition-all duration-400'>
          {interests?.includes(keyword) ? '✓' : '+'}
        </span>
      )
    }

    return (
      <button
        className={cn(
          badgeVariants({ variant }),
          interests?.includes(keyword) ? 'bg-primary/10' : '',
          className
        )}
        ref={ref}
        {...props}
      >
        {renderContent()}
      </button>
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
