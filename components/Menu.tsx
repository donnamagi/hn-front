import { Navlink } from '@/components/Navlink'
import { MAIN_NAV, NavLink as NavlinkType } from '@/lib/constants'

export const MainMenu = () => (
  <div className='flex w-full flex-col'>
    <div className='flex flex-col'>
      {MAIN_NAV.map(({ label, href }: NavlinkType) => (
        <Navlink key={label} href={href}>
          <p>{label}</p>
        </Navlink>
      ))}
    </div>
  </div>
)
