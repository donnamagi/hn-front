import { Article } from '@/components/Article'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import BackButton from '@/components/BackButton'
import { fetchArticle } from '@/lib/utils'
import { Metadata } from 'next'

interface ArticleProps {
  params: Promise<{
    id: number
  }>
}

export async function generateMetadata({
  params
}: ArticleProps): Promise<Metadata> {
  const { id } = await params
  const article = await fetchArticle(id)
  return {
    title: article?.title || 'Hacker News Clone',
    description:
      article?.content_summary?.split(' ').slice(0, 200).join(' ') ||
      `An article from Hacker News on the topic of "${article?.title}"`
  }
}

export default async function Page({ params }: ArticleProps) {
  const { id } = await params

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
