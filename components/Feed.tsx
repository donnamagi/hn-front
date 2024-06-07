'use client'

import { useState, useMemo } from 'react'
import { FeedItem } from '@/components/FeedItem'
import { fetchStoryIds } from '@/lib/utils'

export function Feed({ category }: { category: string }) {
  const [storyIds, setStoryIds] = useState<number[]>([])

  const getStoryIds = async () => {
    try {
      const data = await useMemo(() => fetchStoryIds(category), [category])
      setStoryIds(data)
    } catch (err) {
      console.error('Error fetching story IDs:', err)
    }
  }

  getStoryIds()

  return (
    <div className='-mt-3 text-sm'>
      {storyIds.length > 0
        ? storyIds.map((id) => (
            <FeedItem key={id} storyId={id} category={category} />
          ))
        : null}
    </div>
  )
}
