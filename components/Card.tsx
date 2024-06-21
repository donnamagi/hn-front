import { ArticleType } from '@/components/Article'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface CardProps {
  article: ArticleType
}

export function ArticleCard({ article }: CardProps) {
  return (
    <Card key={article.id}>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.by}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className='text-sm text-muted-foreground line-clamp-3'>
            {article.content_summary}
          </p>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <ArrowUpIcon className='w-4 h-4' />
            <span>{article.score}</span>
          </div>
          <div className='badge'>{article.keywords?.[0]}</div>
        </div>
      </CardContent>
    </Card>
  )
}
