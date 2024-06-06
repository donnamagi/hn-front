'use client'

import { useEffect, useState } from 'react'
import Article from '@/components/Article'

interface FeedProps {
  category?: string
}

export default function Feed({ category }: FeedProps) {
  const [storyIds, setStoryIds] = useState<number[]>([])

  const getStoryIds = async () => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/${category}.json`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: number[] = await response.json()
      setStoryIds(data.slice(0, 30))
    } catch (error) {
      console.error('Error fetching story IDs:', error)
    }
  }

  useEffect(() => {
    getStoryIds()
  }, [])

  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='flex flex-items-center justify-between'>
          <div>
            {storyIds.length > 0
              ? storyIds.map((id) => <Article key={id} storyId={id} />)
              : null}
          </div>
        </div>
      </div>
    </main>
  )
}
