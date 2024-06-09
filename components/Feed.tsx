'use client'

import { useState, useEffect } from 'react'
import { FeedItem } from '@/components/FeedItem'
import { fetchStoryIds } from '@/lib/utils'

export function Feed({ category }: { category: string }) {
  const [storyIds, setStoryIds] = useState<number[]>([])

  useEffect(() => {
    const getStoryIds = async () => {
      try {
        const data = await fetchStoryIds(category)
        setStoryIds(data)
      } catch (err) {
        console.error('Error fetching story IDs:', err)
      }
    }

    getStoryIds()
  }, [category])

  return (
    <div className='-mt-3 text-sm'>
      {storyIds.map((id) => (
        <FeedItem key={id} storyId={id} category={category} />
      ))}
    </div>
  )
}
