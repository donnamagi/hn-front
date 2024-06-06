import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const LINKS = [
  { href: '/best', label: 'Best' },
  { href: '/top', label: 'Top' },
  { href: '/new', label: 'New' },
  { href: '/ask', label: 'Ask HN' },
  { href: '/show', label: 'Show HN' },
  { href: '/jobs', label: 'Jobs' }
]

export const MainMenu = () => (
  <div className='flex w-full flex-col text-sm'>
    <div className='flex flex-col gap-4'>
      <Link
        href='/'
        className={
          (cn('link-card inline-flex items-center gap-2 p-2'),
          buttonVariants({ variant: 'ghost' }))
        }
      >
        <div className='flex flex-col text-center'>
          <span className='font-semibold text-center'>HN</span>
        </div>
      </Link>
      <div className='flex flex-col gap-1'>
        {LINKS.map((link, linkIndex) => (
          <Link
            key={linkIndex}
            href={link.href}
            className={buttonVariants({ variant: 'ghost' })}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
)
