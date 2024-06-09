import { useState, useMemo } from 'react'
import { fetchArticle } from '@/lib/utils'
import { ArticleType } from '@/components/Article'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FeedItemProps {
  storyId: number
  category: string
  isActive?: boolean
}

export function FeedItem({ storyId, category, isActive }: FeedItemProps) {
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
    <Link href={`/${category}/${storyId}`}>
      <div
        className={cn(
          'transition-colors duration-300 my-2 text-sm',
          isActive ? 'text-neutral-800' : 'text-neutral-400 '
        )}
      >
        <h4 className='md:text-base font-bold'>{article.title}</h4>
        <p className='text-sm'>
          {article.url && <span>{domain} | </span>}
          by {article.by}
          {article.descendants !== 0
            ? ` | ${article.descendants} comments`
            : null}
        </p>
      </div>
      <hr />
    </Link>
  )
}
