'use client'

import { useState, useEffect } from 'react'
import { fetchArticle } from '@/lib/utils'
import { Comments, DecodedTextArea } from '@/components/Comment'
import Link from 'next/link'
import { SimilarDialog } from '@/components/Similar'
import { Navlink } from '@/components/Navlink'

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
  articleId: number
}

export function Article({ articleId }: ArticleProps) {
  const [article, setArticle] = useState<ArticleType | null>(null)
  const [commentIds, setCommentIds] = useState<number[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticle = async () => {
      try {
        const article = await fetchArticle(articleId)
        setArticle(article)
        setCommentIds(article.kids?.slice(0, 5) || [])
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    getArticle()
  }, [articleId])

  return (
    <div className='flex justify-center'>
      <div
        className={`max-w-2xl py-10 transition-all duration-100 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {article && (
          <div>
            <ArticleHeader article={article} />
            {article.text && (
              <div>
                <h5 className='text-lg font-bold'>{article.by}</h5>
                <div className='my-3'>
                  <DecodedTextArea text={article.text} />
                </div>
              </div>
            )}
            {commentIds && <Comments commentIds={commentIds} />}
          </div>
        )}
      </div>
    </div>
  )
}

export function ArticleHeader({ article }: { article: ArticleType }) {
  return (
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
          <h4 className='font-medium'>TLDR:</h4>
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
      {article.content_summary && <SimilarDialog articleId={article.id} />}
      <hr className='my-3' />
    </div>
  )
}

interface ArticlePreviewProps {
  article: ArticleType
  category?: string
}

export function ArticlePreview({
  article,
  category = 'article'
}: ArticlePreviewProps) {
  return (
    <div>
      {article && (
        <Navlink href={`/${category}/${article.id}`}>
          <h4 className='text-base tracking-tight'>{article.title}</h4>
          <span className='text-neutral-500'>
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
