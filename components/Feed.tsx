'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { fetchStoryIds, fetchDbArticlesById, fetchArticle } from '@/lib/utils'
import { ArticleType } from '@/components/Article'
import { FeedItem } from '@/components/FeedItem'
import { Skeleton } from '@/components/ui/skeleton'

export function Feed({ category }: { category: string }) {
  const [storyIds, setStoryIds] = useState<number[]>([])
  const [articles, setArticles] = useState<ArticleType[]>([])
  const router = useRouter()
  const storyId = usePathname().split('/').pop()

  const getArticles = async () => {
    const res = await fetchDbArticlesById(storyIds)

    setArticles(res.articles)

    if (res.missing_ids.length > 0) {
      fetchMissingArticles(res.missing_ids)
    }
  }

  const fetchMissingArticles = async (missing_ids: number[]) => {
    await Promise.all(
      missing_ids.map(async (id) => {
        const missingArticle = await fetchArticle(id)
        setArticles((prevArticles) => [...prevArticles, missingArticle])
      })
    )
  }

  useEffect(() => {
    const getStoryIds = async () => {
      try {
        const data = await fetchStoryIds(category)
        setStoryIds(data)

        if (data.length > 0 && storyId === `${category}`) {
          router.replace(`/${category}/${data[0]}`)
        }
      } catch (err) {
        console.error('Error fetching story IDs:', err)
      }
    }

    getStoryIds()
  }, [])

  useEffect(() => {
    if (storyIds.length > 0) {
      getArticles()
    }
  }, [storyIds])

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
      {storyIds.length > 0 &&
        storyIds.map((id) => {
          const article = articles.find((article) => article.id === id)
          if (article) {
            return (
              <FeedItem
                key={article.id}
                category={category}
                article={article}
              />
            )
          } else {
            return <ArticleSkeleton key={`skeleton-${id}`} />
          }
        })}
    </>
  )
}

function ArticleSkeleton() {
  return (
    <>
      <div className='space-y-2 my-4'>
        <Skeleton className='h-4 w-5/6 bg-slate-200' />
        <Skeleton className='h-4 w-2/3 bg-slate-200' />
      </div>
      <hr />
    </>
  )
}
