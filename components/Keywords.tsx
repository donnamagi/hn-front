'use client'

import React, { useEffect, useState } from 'react'
import { fetchTopKeywords } from '@/lib/utils'
import { Toggle } from '@/components/ui/toggle'

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
      <h1 className='text-lg md:text-xl font-bold'>
        Most common topics this week
      </h1>
      <p>Check your interests to get a personalized feed of articles.</p>
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
