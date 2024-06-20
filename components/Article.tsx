'use client'

import { useState, useEffect } from 'react'
import { fetchArticle } from '@/lib/utils'
import { Comments, DecodedTextArea } from '@/components/Comment'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ArticleType {
  by: string
  descendants: number
  hnUrl: string
  id: number
  kids?: number[]
  score: number
  time: string
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

interface ArticleProps {
  storyId: number
}

export function Article({ storyId }: ArticleProps) {
  const [article, setArticle] = useState<ArticleType | null>(null)
  const [commentIds, setCommentIds] = useState<number[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticle = async () => {
      try {
        const article = await fetchArticle(storyId)
        setArticle(article)
        setCommentIds(article.kids?.slice(0, 5) || [])
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    getArticle()
  }, [storyId])

  return (
    <ScrollArea>
      <div className='py-10'>
        <div
          className={`transition-all duration-100 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {article && (
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
                <div className='my-3 text-pretty'>
                  {article.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className='mr-2 my-3 py-1 px-2 border border-rounded text-neutral-800 text-xs rounded-full'
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
              <hr className='my-3' />
              {article.text && (
                <div>
                  <p className='py-10'>
                    <DecodedTextArea text={article.text} />
                  </p>
                  <hr />
                </div>
              )}
              {commentIds && <Comments commentIds={commentIds} />}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
