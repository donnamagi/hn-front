import React from 'react'
import Feed from '@/components/Feed'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Page() {
  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content'>
          <Feed category='beststories' />
        </div>
      </div>
    </ScrollArea>
  )
}
