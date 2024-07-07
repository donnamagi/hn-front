import { Navlink } from '@/components/Navlink'
import { MAIN_NAV } from '@/lib/constants'

export const MainMenu = () => (
  <div className='flex w-full flex-col'>
    <div className='flex flex-col'>
      {Object.keys(MAIN_NAV).map((key: string) => {
        return (
          <Navlink key={key} href={key}>
            {MAIN_NAV[key].label}
          </Navlink>
        )
      })}
    </div>
  </div>
)
