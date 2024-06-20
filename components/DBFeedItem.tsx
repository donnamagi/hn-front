import { ArticleType } from '@/components/Article'
import { Navlink } from '@/components/Navlink'

interface FeedItemProps {
  article: ArticleType
  category: string
}

export function DBFeedItem({ article, category }: FeedItemProps) {
  return (
    <div>
      {article && (
        <Navlink href={`/${category}/${article.id}`}>
          <h4 className='text-base font-bold'>{article.title}</h4>
          <span>
            {article.url && <span>{new URL(article.url).hostname} | </span>}
            by {article.by}
            {article.descendants !== 0
              ? ` | ${article.descendants} comments`
              : null}
          </span>
        </Navlink>
      )}
    </div>
  )
}
