'use client'

import React, { useEffect, useState } from 'react'
import { ArticleCard } from '@/components/Card'
import { fetchSimilarArticles } from '@/lib/utils'
import { ArticleType } from '@/components/Article'

interface ArticleProps {
  storyId: number
}

export function Similar({ storyId }: ArticleProps) {
  const [articles, setArticles] = useState<ArticleType[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchSimilarArticles(storyId)
        console.log(data)

        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className=''>
      {articles.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Similar
