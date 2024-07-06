import { ArticleType } from '@/components/Article'
import { Navlink } from '@/components/Navlink'
import Link from 'next/link'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { buttonVariants } from '@/components/ui/button'

interface FeedItemProps {
  article: ArticleType
  category?: string
  long?: boolean
}

export function FeedItem({ article, category, long }: FeedItemProps) {
  if (!long) {
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
  return (
    <div>
      <div>
        <div>
          <h4 className='text-xl md:text-3xl font-bold text-neutral-800'>
            {article.title}
          </h4>
          <p className='text-sm font-light mt-2'>
            {article.descendants} points by {article.by}, posted on{' '}
            {new Date(article.time).toLocaleString()}
          </p>
          {article.url && (
            <Link
              href={article.url}
              rel='noopener noreferrer'
              className='underline text-sm font-light'
            >
              {new URL(article.url).hostname}
            </Link>
          )}
          {article.content_summary && (
            <div className='my-3'>
              <p>{article.content_summary}</p>
            </div>
          )}
          {article.keywords && (
            <div className='my-3 text-pretty gap-2 flex flex-wrap'>
              {article.keywords.map((keyword) => (
                <span key={keyword} className='badge'>
                  {keyword}
                </span>
              ))}
            </div>
          )}
          {article.content_summary && (
            <Link
              className={buttonVariants({ variant: 'default', size: 'sm' })}
              href={`#similar`}
            >
              Find similar
              <ArrowTopRightIcon />
            </Link>
          )}
          <hr className='my-3' />
        </div>
      </div>
    </div>
  )
}
