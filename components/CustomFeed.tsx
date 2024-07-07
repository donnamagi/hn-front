'use client'

import { useEffect, useState } from 'react'
import { fetchArticlesByKeywords } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ArticleHeader, ArticleType } from '@/components/Article'
import Keywords from '@/components/Keywords'

export function CustomFeed() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(true)

  const getLocalStorage = () => {
    const interests = localStorage.getItem('interests')
    return interests ? JSON.parse(interests) : []
  }

  const getFeed = async (keywords: string[]) => {
    if (keywords.length === 0) {
      setLoading(false)
      return
    }

    try {
      const data = await fetchArticlesByKeywords(keywords)
      setArticles(data)
    } catch (err) {
      console.error('Error fetching article IDs:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    const keywords = getLocalStorage()
    getFeed(keywords)
  }, [])

  if (loading) {
    return <ArticleSkeleton />
  }

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article) => {
          return <ArticleHeader key={article.id} article={article} />
        })
      ) : (
        <Keywords />
      )}
    </>
  )
}

function ArticleSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          <div className='space-y-2 my-4'>
            <Skeleton className='h-4 w-5/6 bg-slate-200' />
            <Skeleton className='h-4 w-2/3 bg-slate-200' />
            <Skeleton className='h-4 w-1/3 bg-slate-200' />
            <Skeleton className='h-4 w-1/3 bg-slate-200' />
            <Skeleton className='h-4 w-5/6 bg-slate-200' />
            <Skeleton className='h-4 w-5/6 bg-slate-200' />
            <Skeleton className='h-4 w-3/6 bg-slate-200' />
          </div>
          <hr />
        </div>
      ))}
    </>
  )
}
