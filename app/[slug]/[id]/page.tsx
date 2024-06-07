import { Article } from '@/components/Article'
import { notFound } from 'next/navigation'

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
    <>
      <div className='flex w-full'>
        <Article storyId={id} />
      </div>
    </>
  )
}
