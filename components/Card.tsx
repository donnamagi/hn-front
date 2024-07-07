import { ArticleType } from '@/components/Article'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface CardProps {
  article: ArticleType
}

export function ArticleCard({ article }: CardProps) {
  return (
    <Link href={`/best/${article.id}`}>
      <Card
        key={article.id}
        className='transition-all duration-100 border-slate-800 shadow-sm hover:shadow-md h-full flex flex-col'
      >
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>{article.by}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground line-clamp-3'>
            {article.content_summary}
          </p>
        </CardContent>
        <CardFooter className='justify-between mt-auto mb-0'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground text-orange-500'>
            <ArrowUpIcon className='w-4 h-4' />
            <span>{article.score}</span>
          </div>
          {article.keywords?.[0] && (
            <div className='badge'>{article.keywords?.[0]}</div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
