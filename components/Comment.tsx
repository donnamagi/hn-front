import { fetchComment } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

interface CommentProps {
  commentId: number
  depth: number | undefined
}

export interface CommentType {
  by: string
  id: number
  kids: number[]
  parent: number
  text: string
  time: number
  type: string
  depth: number
}

function decode(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.innerHTML
}

export function DecodedTextArea({ text }: { text: string }) {
  const decodedText = decode(text)
  return (
    <div
      className='p-margin'
      dangerouslySetInnerHTML={{ __html: decodedText }}
    />
  )
}

export function Comment({ commentId, depth }: CommentProps) {
  const [comment, setComment] = useState<CommentType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getComments = async (commentId: number) => {
      try {
        const comment = await fetchComment(commentId)
        comment.depth = depth || 0
        setComment(comment)
      } catch (err) {
        console.error('Error fetching comments:', err)
      } finally {
        setLoading(false)
      }
    }

    getComments(commentId)
  }, [commentId])

  return (
    <div className='py-5 ms-5'>
      <div
        className={`transition-all duration-200 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {comment && (
          <div className='content-wrapper'>
            <div className='content'>
              <p className='font-bold mb-1'> {comment.by}</p>
              <DecodedTextArea text={comment.text} />
            </div>
            {comment.kids &&
              comment.depth < 3 &&
              comment.kids.map((kid) => (
                <Comment key={kid} commentId={kid} depth={comment.depth + 1} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
