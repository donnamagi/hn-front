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

export function Comment({ comment }: CommentProps) {
  return (
    <div className='content-wrapper'>
      <div className='content text-sm'>
        <p className='font-bold mb-2'> {comment.by}</p>
        <DecodedTextArea text={comment.text} />
      </div>
    </div>
  )
}
