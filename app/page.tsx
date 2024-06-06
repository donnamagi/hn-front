import React from 'react'
import Feed from '@/components/Feed'
import { ScrollArea } from '@/components/Scrollarea'

export default function Page() {
  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content'>
          <Feed />
        </div>
      </div>
    </ScrollArea>
  )
}
