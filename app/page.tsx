'use client'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { preloadStories } from '@/lib/utils'
import Recents from '@/components/Recents'

export default function Page() {
  preloadStories()

  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content'>
          <div className='min-h-screen w-full p-3 md:p-9'>
            <Recents />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
