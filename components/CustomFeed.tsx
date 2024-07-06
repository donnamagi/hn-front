'use client'

import { useEffect, useState } from 'react'
import { fetchArticlesByKeywords } from '@/lib/utils'
import { FeedItem } from '@/components/FeedItem'
import { Skeleton } from '@/components/ui/skeleton'
import { ArticleType } from '@/components/Article'

export function CustomFeed() {
  const [articles, setArticles] = useState<ArticleType[]>([])

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

  useEffect(() => {
    const keywords = getLocalStorage()
    getFeed(keywords)
  }, [])

  return (
    <>
      {articles.length > 0 &&
        articles.map((article) => {
          return (
            <FeedItem
              key={article.id}
              category={'feed'}
              article={article}
              long={true}
            />
          )
        })}
      {articles.length === 0 &&
        [...Array(5)].map((_, i) => {
          return <ArticleSkeleton key={i} />
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
