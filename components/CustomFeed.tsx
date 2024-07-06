'use client'

import { useEffect, useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { fetchArticlesByKeywords } from '@/lib/utils'
import { FeedItem } from '@/components/FeedItem'
import { Skeleton } from '@/components/ui/skeleton'
import { ArticleType } from '@/components/Article'

export function CustomFeed() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const router = useRouter()
  const articleId = usePathname().split('/').pop()

  const getLocalStorage = () => {
    const interests = localStorage.getItem('interests')
    return interests ? JSON.parse(interests) : []
  }

  const getFeed = async (keywords: string[]) => {
    try {
      const data = await fetchArticlesByKeywords(keywords)
      setArticles(data)
    } catch (err) {
      console.error('Error fetching article IDs:', err)
    }
  }
  const articleIds = articles.map((article: ArticleType) => article.id)

  useEffect(() => {
    const keywords = getLocalStorage()
    getFeed(keywords)
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
        router.push(`/feed/${articleIds[newIndex]}`)
      }
    },
    [articleId, router]
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
              <FeedItem key={article.id} category={'feed'} article={article} />
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
