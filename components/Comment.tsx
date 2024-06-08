interface CommentProps {
  comment: CommentType
}

export interface CommentType {
  by: string
  id: number
  kids: number[]
  parent: number
  text: string
  time: number
  type: string
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className='content-wrapper'>
      <div className='content'>
        <p> {comment.by}</p>
        <p> {comment.text}</p>
      </div>
    </div>
  )
}
