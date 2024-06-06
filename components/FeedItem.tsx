import { useState, useMemo } from 'react'
import { fetchArticle } from '@/lib/utils'
import { ArticleType } from '@/components/Article'

interface FeedItemProps {
  storyId: number
}

export function FeedItem({ storyId }: FeedItemProps) {
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
      <div className='my-2'>
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
