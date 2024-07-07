import { Article } from '@/components/Article'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import BackButton from '@/components/BackButton'

interface ArticleProps {
  params: {
    id: number
  }
}

export default function Page({ params }: ArticleProps) {
  const { id } = params

  if (isNaN(id)) {
    return notFound()
  }

  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content p-3 md:p-9'>
          <BackButton />
          <Article articleId={id} />
        </div>
      </div>
    </ScrollArea>
  )
}
