'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FeedItem } from '@/components/FeedItem'
import { fetchStoryIds } from '@/lib/utils'

export function Feed({ category }: { category: string }) {
  const [storyIds, setStoryIds] = useState<number[]>([])
  const router = useRouter()
  const storyId = usePathname().split('/').pop()

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

  const navigationMapping: { [key: string]: number } = {
    ArrowUp: -1,
    ArrowDown: 1
  }

  const onKeyNav = useCallback(
    (event: KeyboardEvent) => {
      if (!storyId) return

      const currentIndex = storyIds.indexOf(Number(storyId))
      const direction = navigationMapping[event.key]

      if (direction !== undefined) {
        const newIndex =
          (currentIndex + direction + storyIds.length) % storyIds.length
        router.push(`/${category}/${storyIds[newIndex]}`)
      }
    },
    [storyId, storyIds, category, router]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyNav)
    return () => {
      window.removeEventListener('keydown', onKeyNav)
    }
  }, [onKeyNav])

  return (
    <>
      {storyIds.map((id) => (
        <FeedItem key={id} storyId={id} category={category} />
      ))}
    </>
  )
}
