'use client'

import { useState, useEffect } from 'react'
import { FeedItem } from '@/components/FeedItem'
import { fetchStoryIds } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function Feed({ category }: { category: string }) {
  const [storyIds, setStoryIds] = useState<number[]>([])
  const pathname = usePathname()

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
      {storyIds.map((id) => {
        const isActive = pathname === `/${category}/${id}`
        return (
          <FeedItem
            key={id}
            storyId={id}
            category={category}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}
