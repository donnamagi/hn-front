import { fetchComment } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

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

export function Comment({ comment }: { comment: CommentType }) {
  const [loading, setLoading] = useState(true)

  if (
    comment.text === '[deleted]' ||
    comment.text === '[delayed]' ||
    comment.text === '[dead]' ||
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
        'opacity-100': !loading,
        'ms-5': comment.depth === 1,
        'ms-10': comment.depth === 2,
        'ms-15': comment.depth === 3
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
  const [sortedComments, setSortedComments] = useState<CommentType[]>([])
  const visited = new Set<number>()

  if (!commentIds) return null

  useEffect(() => {
    const DFS = async (commentIds: number[], depth: number) => {
      if (depth > 3) return

      for (const commentId of commentIds) {
        if (visited.has(commentId)) continue

        visited.add(commentId)
        const comment = await fetchComment(commentId)
        // Set the current depth
        comment.depth = depth++
        setSortedComments((prev) => [...prev, comment])

        if (comment.kids && comment.kids.length > 0) {
          await DFS(comment.kids, depth++)
        }
      }
    }

    const fetchComments = async () => {
      await DFS(commentIds, 0)
    }
    fetchComments()
  }, [commentIds])

  return (
    <>
      {sortedComments &&
        sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </>
  )
}
