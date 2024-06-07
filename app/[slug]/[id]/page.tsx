import { Article } from '@/components/Article'
import { notFound } from 'next/navigation'
import { fetchComments } from '@/lib/utils'
import { useMemo } from 'react'

interface FeedLayoutProps {
  children: React.ReactNode
  params: {
    id: number
  }
}

export default async function FeedLayout({ params }: FeedLayoutProps) {
  const { id } = params

  if (isNaN(id)) {
    return notFound()
  }

  return (
    <div className='content-wrapper'>
      <div className='content p-3 md:p-9'>
        <Article storyId={id} />
      </div>
    </div>
  )
}
