import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Recents from '@/components/Recents'
import { Keywords } from '@/components/Keywords'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Page() {
  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content flex justify-center'>
          <div className='min-h-screen max-w-3xl p-3 md:p-9'>
            <div className='my-5'>
              <div className='flex items-center justify-between my-4 ms-1'>
                <div>
                  <h1 className='text-lg md:text-xl font-bold'>
                    Trending topics
                  </h1>
                  <p>
                    Get a personalized feed of articles. Start by choosing your
                    interests.
                  </p>
                </div>

                <Link
                  href='/custom'
                  className={buttonVariants({ variant: 'default' })}
                >
                  My feed
                </Link>
              </div>
              <Keywords />
            </div>
            <Recents />
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
