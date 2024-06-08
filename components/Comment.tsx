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

function decode(html: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const DecodedComment = ({ text }: { text: string }) => {
  const decodedText = decode(text)
  return <div dangerouslySetInnerHTML={{ __html: decodedText }} />
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className='content-wrapper'>
      <div className='content'>
        <p className='font-bold'> {comment.by}</p>
        <DecodedComment text={comment.text} />
      </div>
    </div>
  )
}
