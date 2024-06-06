import { useState, useEffect } from 'react'

interface ArticleProps {
  storyId: number
}

interface Article {
  by: string
  descendants: number
  hnUrl: string
  id: number
  kids?: number[]
  score: number
  time?: number
  title: string
  type: string
  url: string
  deleted: boolean | null
  text: string | null
  dead: boolean | null
  parent: number | null
  poll: number | null
  parts: number[] | null
  content_summary?: string | null
  keywords?: string[] | null
}

export default function Article({ storyId }: ArticleProps) {
  const [article, setArticle] = useState<Article | null>(null)

  const getArticle = async () => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: Article = await response.json()
      setArticle(data)
    } catch (error) {
      console.error('Error fetching article:', error)
    }
  }

  useEffect(() => {
    getArticle()
  }, [storyId])

  if (!article) {
    return <div>Loading article...</div>
  }

  const domain = article?.url ? new URL(article.url).hostname : null

  return (
    <>
      <div className='py-10 px-3'>
        <h2 className='text-3xl md:text-4xl font-bold text-neutral-800'>
          {article.title}
        </h2>
        <p className='text-neutral-600'>
          <a href={article.url} rel='noopener noreferrer'>
            {domain}
          </a>{' '}
          | {article.score} points | by {article.by} |{' '}
          <a href={article.hnUrl} className='mb-3' rel='noopener noreferrer'>
            {article.descendants} comments{' '}
          </a>
        </p>
      </div>
      <hr />
    </>
  )
}
