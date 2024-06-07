import { useState, useMemo } from 'react'
import { fetchArticle } from '@/lib/utils'
import { ArticleType } from '@/components/Article'
import Link from 'next/link'

interface FeedItemProps {
  storyId: number
  category: string
}

export function FeedItem({ storyId, category }: FeedItemProps) {
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
      <Link href={`/${category}/${storyId}`}>
        <div className='my-2'>
          <h4 className='text-sm md:text-base font-bold text-neutral-800'>
            {article.title}
          </h4>
          <p className='text-neutral-600 text-sm'>
            {article.url && (
              <Link href={article.url} rel='noopener noreferrer'>
                {domain} |{' '}
              </Link>
            )}
            by {article.by}
            {article.descendants !== 0
              ? ` | ${article.descendants} comments`
              : null}
          </p>
        </div>
      </Link>
      <hr />
    </>
  )
}
