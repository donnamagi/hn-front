import { useState, useMemo } from 'react'
import { fetchArticle } from '@/lib/utils'
import { ArticleType } from '@/components/Article'
import { Navlink } from '@/components/Navlink'

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
    <Navlink href={`/${category}/${storyId}`}>
      <h4 className='text-base font-bold'>{article.title}</h4>
      <span>
        {article.url && <span>{domain} | </span>}
        by {article.by}
        {article.descendants !== 0
          ? ` | ${article.descendants} comments`
          : null}
      </span>
    </Navlink>
  )
}
