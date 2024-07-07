'use client'

import React, { useEffect, useState } from 'react'
import {
  fetchTopKeywords,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from './ui/badge'

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
    setInterests(getLocalStorage('interests'))
  }, [])

  const addInterest = (keyword: string) => {
    setInterests([...interests, keyword])
    setLocalStorage('interests', keyword)
  }

  const removeInterest = (keyword: string) => {
    setInterests(interests.filter((i) => i !== keyword))
    removeLocalStorage('interests', keyword)
  }

  const toggleInterest = (keyword: string) => {
    if (interests.includes(keyword)) {
      removeInterest(keyword)
    } else {
      addInterest(keyword)
    }
  }

  return (
    <div className='my-5'>
      <div className='flex items-center justify-between my-4 ms-1'>
        <div>
          <h1 className='text-lg md:text-xl font-bold'>
            Most common topics this week
          </h1>
          <p>
            Get a personalized feed of articles. Start by choosing your
            interests.
          </p>
        </div>
        <div
          className={`transition-all duration-200 ${
            interests.length > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link
            href='/custom'
            className={buttonVariants({ variant: 'default' })}
          >
            My feed
          </Link>
        </div>
      </div>
      {keywords.length !== 0 && (
        <div className='gap-2 flex flex-wrap mt-3'>
          {keywords.map((keyword) => (
            <Badge
              key={keyword[0]}
              keyword={keyword[0]}
              interests={interests}
              variant='interactive'
              onClick={() => {
                toggleInterest(keyword[0])
              }}
            >
              {keyword[0]}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default Keywords
