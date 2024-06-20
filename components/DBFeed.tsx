'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { DBFeedItem } from '@/components/DBFeedItem'
import { fetchThisWeeksArticles } from '@/lib/utils'
import { ArticleType } from './Article'

export function DBFeed() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [storyIds, setStoryIds] = useState<number[]>([])
  const router = useRouter()
  const storyId = usePathname().split('/').pop()

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles = await fetchThisWeeksArticles()

        setArticles(articles)
        setStoryIds(articles.map((story) => story.id))

        router.push(`/week/${articles[0].id}`)
      } catch (err) {
        console.error('Error fetching story IDs:', err)
      }
    }

    getArticles()
  }, [])

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
        router.push(`/week/${storyIds[newIndex]}`)
      }
    },
    [storyId, storyIds, router]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyNav)
    return () => {
      window.removeEventListener('keydown', onKeyNav)
    }
  }, [onKeyNav])

  return (
    <>
      {articles.map((article) => (
        <DBFeedItem key={article.id} article={article} category={'week'} />
      ))}
    </>
  )
}
