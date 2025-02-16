import { Article } from '@/components/Article'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Metadata } from 'next'
import { fetchArticle } from '@/lib/utils'
import { FloatingHeader } from '@/components/ui/header'

interface PageProps {
  params: Promise<{
    id: string
    slug: string
  }>
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = await fetchArticle(parseInt(id, 10))
  return {
    title: article?.title || 'Hacker News Clone',
    description:
      article?.content_summary?.split(' ').slice(0, 200).join(' ') ||
      `An article from Hacker News on the topic of "${article?.title}"`
  }
}

export default async function Page({ params }: PageProps) {
  const { id, slug } = await params
  const numericId = parseInt(id, 10)

  if (isNaN(numericId)) {
    return notFound()
  }

  return (
    <ScrollArea>
      <FloatingHeader scrollTitle={slug} goBackLink={`/${slug}`} />
      <div className='content-wrapper'>
        <div className='content p-3 lg:p-9'>
          <Article articleId={numericId} />
        </div>
      </div>
    </ScrollArea>
  )
}
