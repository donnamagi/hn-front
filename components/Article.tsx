'use client'

import { useState, useEffect } from 'react'
import {
  fetchArticle,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from '@/lib/utils'
import { Comments, DecodedTextArea } from '@/components/Comment'
import Link from 'next/link'
import { SimilarDialog } from '@/components/Similar'
import { Navlink } from '@/components/Navlink'
import { Badge } from '@/components/ui/badge'

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
            <div className='sticky top-0 z-10 border-b bg-white py-3'>
              <ArticleHeader article={article} />
            </div>
            {article.text ? (
              <MainContentBox title={article.by}>
                <DecodedTextArea text={article.text} />
              </MainContentBox>
            ) : (
              article.content_summary && (
                <MainContentBox title='TLDR'>
                  <p>{article.content_summary}</p>
                </MainContentBox>
              )
            )}
            {commentIds && <Comments commentIds={commentIds} />}
          </div>
        )}
      </div>
    </div>
  )
}

function MainContentBox({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className='my-4'>
      <div className='p-3 rounded bg-orange-50 -mt-1.5'>
        <div className='font-medium text-orange-500 italic'>{title}</div>
        {children}
      </div>
    </div>
  )
}

function ArticleHeader({ article }: { article: ArticleType }) {
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    const interests = getLocalStorage('interests')
    setInterests(interests)
  }, [])

  const removeInterest = (interest: string) => {
    removeLocalStorage('interests', interest)
    setInterests([...interests.filter((i) => i !== interest)])
  }

  const addInterest = (interest: string) => {
    const newInterest = setLocalStorage('interests', interest)
    if (newInterest) {
      setInterests([...interests, interest])
    }
  }

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      return removeInterest(interest)
    }

    addInterest(interest)
  }

  return (
    <div>
      <div className='flex items-top justify-between'>
        <h4 className='text-xl md:text-3xl font-bold text-neutral-800 tracking-tight'>
          {article.title}
        </h4>
        {article.content_summary && <SimilarDialog articleId={article.id} />}
      </div>
      <p className='text-sm font-light mt-2 tracking-tight'>
        {article.descendants} points by {article.by}, posted{' '}
        {new Date(article.time).toLocaleString()}
        {article.url && (
          <>
            {' '}
            on{' '}
            <Link
              href={article.url}
              rel='noopener noreferrer'
              className='underline text-sm font-light'
            >
              {new URL(article.url).hostname}
            </Link>
          </>
        )}
      </p>
      {article.keywords && (
        <div className='my-3 text-pretty gap-2 flex flex-wrap'>
          {article.keywords.map((keyword) => (
            <Badge
              key={keyword}
              keyword={keyword}
              interests={interests}
              variant={'interactive'}
              onClick={() => toggleInterest(keyword)}
            >
              {keyword}
            </Badge>
          ))}
        </div>
      )}
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
