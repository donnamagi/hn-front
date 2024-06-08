'use client'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { preloadStories } from '@/lib/utils'

export default function Page() {
  preloadStories()
  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content'>
          <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='mb-4'>Nothing here yet :)</h1>
            <Link
              href='/top'
              className={buttonVariants({ variant: 'outline' })}
            >
              See top stories
            </Link>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
