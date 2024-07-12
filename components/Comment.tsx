import { fetchComment } from '@/lib/utils'
import React, { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface CommentType {
  by: string
  id: number
  kids: number[]
  parent: number | null
  text: string
  time: number
  type: string
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

export function Comment({ comment }: { comment: CommentType }) {
  const [loading, setLoading] = useState(true)

  if (
    comment.text === '[deleted]' ||
    comment.text === '[delayed]' ||
    comment.text === '[dead]' ||
    comment.text === '[flagged]' ||
    comment.text === undefined
  ) {
    return null
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div
      className={cn('py-3 transition-all duration-300', {
        'opacity-0': loading,
        'opacity-100': !loading
      })}
    >
      {comment && (
        <div className='content-wrapper'>
          <div className='content'>
            <p className='font-bold mb-1'>{comment.by}</p>
            <DecodedTextArea text={comment.text} />
          </div>
        </div>
      )}
    </div>
  )
}

export function Comments({ commentIds }: { commentIds: number[] }) {
  const [comments, setComments] = useState<{ [key: number]: CommentType }>({})
  if (!commentIds) return null

  useEffect(() => {
    const addComment = async (id: number, parent: number | null = null) => {
      if (comments[id]) return

      const comment = await fetchComment(id)

      // adding the comment to the comments object here to trigger a state update
      setComments((prev) => ({
        ...prev,
        [id]: { ...comment, parent: parent }
      }))

      if (comment.kids?.length > 0) {
        comment.kids.forEach((kid) => {
          addComment(kid, id)
        })
      }
    }

    commentIds.forEach((id) => addComment(id))
  }, [commentIds])

  const renderComment = (id: number) => {
    const comment = comments[id]
    if (!comment) return null

    return (
      <div key={comment.id}>
        <Comment comment={comment} />
        {comment.kids?.map((kidId) => (
          <div className='ml-6'>{renderComment(kidId)}</div>
        ))}
      </div>
    )
  }

  return <div>{commentIds.map((id) => renderComment(id))}</div>
}
