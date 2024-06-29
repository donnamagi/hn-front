import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Recents from '@/components/Recents'
import Keywords from '@/components/Keywords'

export default function Page() {
  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content'>
          <div className='min-h-screen w-full p-3 md:p-9'>
            <Keywords />
            <Recents />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
