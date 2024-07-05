'use client'

import React, { useEffect, useState } from 'react'
import { fetchTopKeywords } from '@/lib/utils'
import { Toggle } from '@/components/ui/toggle'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function Keywords() {
  const [keywords, setKeywords] = useState([])
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const data = await fetchTopKeywords(30)
        setKeywords(data)
      } catch (error) {
        console.error('Error fetching keywords:', error)
      }
    }

    fetchKeywords()
  }, [])

  return (
    <div className='my-5'>
      <div className='flex items-center justify-between my-4 ms-1'>
        <div>
          <h1 className='text-lg md:text-xl font-bold'>
            Most common topics this week
          </h1>
          <p>Get a personalized feed of articles.</p>
        </div>
        <div
          className={`transition-all duration-200 ${
            interests.length > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link href='/feed' className={buttonVariants({ variant: 'outline' })}>
            My feed
          </Link>
        </div>
      </div>
      {keywords.length !== 0 && (
        <div className='gap-2 flex flex-wrap mt-3'>
          {keywords.map((keyword) => (
            <Toggle
              key={keyword[0]}
              className='badge'
              size={'sm'}
              onClick={() => {
                if (interests.includes(keyword[0])) {
                  setInterests(
                    interests.filter((i: string) => i !== keyword[0])
                  )
                } else {
                  setInterests([...interests, keyword[0]])
                }
              }}
            >
              {keyword[0]}
            </Toggle>
          ))}
        </div>
      )}
    </div>
  )
}

export default Keywords
