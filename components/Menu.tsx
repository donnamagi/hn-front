import { Navlink } from '@/components/Navlink'
import { Flame, Home, Rocket, Rss, Sparkles } from '@/lib/icons'

export type NavLink = {
  label: string
  description: string
  icon?: JSX.Element
}

export type NavMap = {
  [key: string]: NavLink
}

export const MAIN_NAV: NavMap = {
  '/': { label: 'Home', description: 'The home page', icon: <Home /> },
  '/custom': {
    label: 'Feed',
    description: 'Your custom feed',
    icon: <Rss />
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
  <div className='flex w-full flex-col'>
    <div className='flex flex-col'>
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
