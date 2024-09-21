import { Navlink } from '@/components/Navlink'
import { Flame, Home, Rocket, Sparkles } from '@/lib/icons'
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
  },
  '/podcasts': {
    label: 'Podcasts',
    description: 'Latest on Hacker News regarding AI news and trends',
    icon: <Sparkles />
  }
}

export const MainMenu = () => (
  <div className='flex w-full flex-col'>
    <div className='flex flex-col'>
      <div className='flex items-center justify-center p-3'>
        <Link href='/'>
          <span className='text-lg font-semibold tracking-tight text-primary'>
            Hacker News
          </span>
        </Link>
      </div>
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
    </div>
  </div>
)
