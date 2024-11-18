import { Article } from '@/components/Article'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Metadata } from 'next'
import { fetchArticle } from '@/lib/utils'
import { FloatingHeader } from '@/components/ui/header'

interface ArticleProps {
  params: {
    id: number
    slug: string
  }
}

export async function generateMetadata({
  params
}: ArticleProps): Promise<Metadata> {
  const { id } = params
  const article = await fetchArticle(id)
  return {
    title: article?.title || 'Hacker News Clone',
    description:
      article?.content_summary?.split(' ').slice(0, 200).join(' ') ||
      `An article from Hacker News on the topic of "${article?.title}"`
  }
}

export default function Page({ params }: ArticleProps) {
  const { id, slug } = params

  if (isNaN(id)) {
    return notFound()
  }

  return (
    <ScrollArea>
      <FloatingHeader scrollTitle={slug} goBackLink={`/${slug}`} />
      <div className='content-wrapper'>
        <div className='content p-3 lg:p-9'>
          <Article articleId={id} />
        </div>
      </div>
    </ScrollArea>
  )
}
