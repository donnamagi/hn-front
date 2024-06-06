import { useState, useMemo } from 'react'
import { fetchArticle } from '@/lib/utils'

interface ArticleProps {
  storyId: number
}

export interface ArticleType {
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

export function Article({ storyId }: ArticleProps) {
  const [article, setArticle] = useState<ArticleType | null>(null)

  const getArticle = async () => {
    try {
      const article = await useMemo(() => fetchArticle(storyId), [storyId])
      setArticle(article)
    } catch (err) {
      console.error('Error fetching article:', err)
    }
  }

  getArticle()

  if (!article) {
    return <div>Loading article...</div>
  }

  const domain = article?.url ? new URL(article.url).hostname : null

  return (
    <>
      <div className='py-10 px-3'>
        <h4 className='text-sm md:text-base font-bold text-neutral-800'>
          {article.title}
        </h4>
        <p className='text-neutral-600 text-sm'>
          <a href={article.url} rel='noopener noreferrer'>
            {domain}
          </a>{' '}
          | {article.score} points by {article.by} |{' '}
          <a href={article.hnUrl} className='mb-3' rel='noopener noreferrer'>
            {article.descendants} comments{' '}
          </a>
        </p>
      </div>
      <hr />
    </>
  )
}
