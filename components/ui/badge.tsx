import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

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
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLButtonElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    const renderContent = () => {
      if (variant === 'interactive') {
        return (
          <span className='inline-block mr-[-15px] hover:mr-0 transition-margin duration-300 ease-in-out'>
            {children}
            <span className='ml-2 text-md'>+</span>
          </span>
        )
      } else {
        return children
      }
    }

    return (
      <button
        className={cn(badgeVariants({ variant }), className)}
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
