import { Navlink } from '@/components/Navlink'
import { Flame, Home, Rocket, Sparkles, Headphones } from '@/lib/icons'
import Link from 'next/link'

export type NavLink = {
  label: string
  description: string
  icon?: JSX.Element
}

export type NavMap = {
  [key: string]: NavLink
}

export const MAIN_NAV: NavMap = {
  '/custom': {
    label: 'Feed',
    description: 'Your custom feed, based on your interests',
    icon: <Home />
  },
  '/best': {
    label: 'Best',
    description: 'Most popular stories this week',
    icon: <Flame />
  },
  '/top': {
    label: 'Top',
    description: 'Gaining traction right now',
    icon: <Rocket />
  },
  '/show': {
    label: 'Show',
    description: 'What the community is building',
    icon: <Sparkles />
  }
}

export const MainMenu = () => (
  <div className='flex flex-col flex-1'>
    <Link href='/' className='text-center p-3'>
      <span className='text-lg font-semibold tracking-tight text-primary'>
        HNN
      </span>
      <p className='text-muted-foreground text-xs text-center'>
        Not affiliated with Hacker News or Y Combinator.
      </p>
    </Link>
    {Object.keys(MAIN_NAV).map((key: string) => {
      return (
        <Navlink key={key} href={key}>
          <div className='flex'>
            {MAIN_NAV[key].icon}
            <span className='ms-3'>{MAIN_NAV[key].label}</span>
          </div>
        </Navlink>
      )
    })}
    <div className='mt-auto mb-0 p-3 flex flex-col gap-2 text-sm'>
      <Link href='/privacy' className='text-muted-foreground'>
        Privacy Policy
      </Link>
      <Link href='/terms' className='text-muted-foreground'>
        Terms of Service
      </Link>
      <p className='text-muted-foreground text-xs text-center'>
        with ♡ by{' '}
        <a href='https://donnamagi.com' className='underline text-xs'>
          donna
        </a>
      </p>
    </div>
  </div>
)
