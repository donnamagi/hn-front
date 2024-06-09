'use client'

import { useState, useEffect } from 'react'
import { fetchArticle, fetchComments } from '@/lib/utils'
import { DecodedTextArea } from '@/components/Comment'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Comment, CommentType } from '@/components/Comment'
import { cn } from '@/lib/utils'

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

interface ArticleProps {
  storyId: number
}

export function Article({ storyId }: ArticleProps) {
  const [article, setArticle] = useState<ArticleType | null>(null)
  const [comments, setComments] = useState<CommentType[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getArticle = async () => {
      try {
        const article = await fetchArticle(storyId)
        setArticle(article)
        getComments(article.kids || [], storyId)
      } catch (err) {
        console.error('Error fetching article:', err)
      }
    }

    const getComments = async (commentIds: number[], storyId: number) => {
      try {
        const comments = await fetchComments(storyId, commentIds)
        setComments(comments)
      } catch (err) {
        console.error('Error fetching comments:', err)
      } finally {
        setLoading(false)
      }
    }

    getArticle()
  }, [storyId])

  const domain = article?.url ? new URL(article.url).hostname : null

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
              <p>
                {article.descendants} points by {article.by}
              </p>
              {article.url && (
                <Link
                  href={article.url}
                  rel='noopener noreferrer'
                  className='underline text-sm'
                >
                  {domain}
                </Link>
              )}
              <hr />
              {article.text && (
                <div>
                  <p className='py-10'>
                    <DecodedTextArea text={article.text} />
                  </p>
                  <hr />
                </div>
              )}
              <div className='py-4'>
                {comments &&
                  comments.map((comment) => (
                    <div key={comment.id} className='py-5'>
                      <Comment comment={comment} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
