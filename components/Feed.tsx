'use client'

import { useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useArticles } from '@/lib/hooks'
import { ArticlePreview } from '@/components/Article'
import { Skeleton } from '@/components/ui/skeleton'

export function Feed({ category }: { category: string }) {
  const { articles, articleIds, getArticles } = useArticles()
  const router = useRouter()
  const endOfPath = usePathname().split('/').pop()

  useEffect(() => {
    getArticles(category, 30)
  }, [])

  useEffect(() => {
    // push to first article if user just navigated to category and not mobile
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      if (articleIds.length > 0) {
        if (!Number(endOfPath)) {
          router.push(`/${category}/${articleIds[0]}`)
        }
      }
    }
  }, [articleIds])

  const navigationMapping: { [key: string]: number } = {
    ArrowUp: -1,
    ArrowDown: 1
  }

  const onKeyNav = useCallback(
    (event: KeyboardEvent) => {
      const articleId = Number(endOfPath)
      if (!articleId) return

      const currentIndex = articleIds.indexOf(Number(articleId))
      const direction = navigationMapping[event.key]

      if (direction !== undefined) {
        const newIndex =
          (currentIndex + direction + articleIds.length) % articleIds.length
        router.push(`/${category}/${articleIds[newIndex]}`)
      }
    },
    [endOfPath, articleIds, category, router]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyNav)
    return () => {
      window.removeEventListener('keydown', onKeyNav)
    }
  }, [onKeyNav])

  return (
    <>
      {articleIds.length > 0 &&
        articleIds.map((id) => {
          const article = articles.find((article) => article.id === id)
          if (article) {
            return (
              <ArticlePreview
                key={article.id}
                category={category}
                article={article}
              />
            )
          } else {
            return <FeedSkeleton key={`skeleton-${id}`} />
          }
        })}
    </>
  )
}

export function FeedSkeleton({ numItems = 1 }: { numItems?: number }) {
  return (
    <>
      {Array.from({ length: numItems }).map((_, i) => (
        <div key={i}>
          <div className='space-y-2 my-4'>
            <Skeleton className='h-4 w-5/6 bg-slate-200' />
            <Skeleton className='h-4 w-2/3 bg-slate-200' />
          </div>
        </div>
      ))}
    </>
  )
}
