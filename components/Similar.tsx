'use client'

import React, { useEffect, useState } from 'react'
import { ArticleCard } from '@/components/Card'
import { fetchSimilarArticles } from '@/lib/utils'
import { ArticleType } from '@/components/Article'

interface ArticleProps {
  articleId: number
}

export function Similar({ articleId }: ArticleProps) {
  const [articles, setArticles] = useState<ArticleType[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchSimilarArticles(articleId)
        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <>
      <hr />
      <h1 className='text-lg md:text-2xl font-bold my-5'>
        More articles like this
      </h1>
      {articles.length > 0 && (
        <div className='grid grid-cols-1 gap-4'>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
      {articles.length === 0 && (
        <p className='text-center text-gray-500'>
          No semantically similar articles found
        </p>
      )}
    </>
  )
}

export default Similar
