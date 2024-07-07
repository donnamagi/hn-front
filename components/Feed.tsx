'use client'

import { useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useArticles } from '@/lib/hooks'
import { ArticlePreview } from '@/components/Article'
import { Skeleton } from '@/components/ui/skeleton'

export function Feed({ category }: { category: string }) {
  const { articles, articleIds, getArticles } = useArticles()
  const router = useRouter()
  const articleId = usePathname().split('/').pop()

  useEffect(() => {
    getArticles(category, 30)
  }, [])

  const navigationMapping: { [key: string]: number } = {
    ArrowUp: -1,
    ArrowDown: 1
  }

  const onKeyNav = useCallback(
    (event: KeyboardEvent) => {
      if (!articleId) return

      const currentIndex = articleIds.indexOf(Number(articleId))
      const direction = navigationMapping[event.key]

      if (direction !== undefined) {
        const newIndex =
          (currentIndex + direction + articleIds.length) % articleIds.length
        router.push(`/${category}/${articleIds[newIndex]}`)
      }
    },
    [articleId, articleIds, category, router]
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
