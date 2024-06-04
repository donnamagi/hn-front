interface ArticleProps {
  Article: {
    by: string
    descendants: number
    hnUrl: string
    id: number
    kids?: number[]
    score: number
    time: number
    title: string
    type: string
    url: string
  }
}

export default function Article({ Article }: ArticleProps) {
  const domain = Article.url ? new URL(Article.url).hostname : null
  return (
    <>
      <div className='py-10 px-3'>
        <h2 className='text-3xl md:text-4xl font-bold text-neutral-800'>
          {Article.title}
        </h2>
        <div className='mt-3 pb-4 text-neutral-600'>
          <p>
            <a href={Article.url} rel='noopener noreferrer'>
              {domain}
            </a>{' '}
            | {Article.score} points by {Article.by} |{' '}
            <a href={Article.hnUrl} className='mb-3' rel='noopener noreferrer'>
              {Article.descendants} comments{' '}
            </a>
          </p>
        </div>
      </div>
      <hr />
    </>
  )
}
