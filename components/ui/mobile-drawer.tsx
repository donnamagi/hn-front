import { CommandIcon } from '@/lib/icons'

import { MainMenu } from '@/components/Menu'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

export function MobileDrawer(): JSX.Element {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon' title='Toggle drawer'>
          <CommandIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='overflow-y-auto p-4'>
          <MainMenu />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
