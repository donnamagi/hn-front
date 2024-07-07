'use client'

import React, { useEffect, useState } from 'react'
import { ArticlePreview } from '@/components/Article'
import { fetchSimilarArticles } from '@/lib/utils'
import { ArticleType } from '@/components/Article'
import { Button } from '@/components/ui/button'
import { FeedSkeleton } from '@/components/Feed'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface ArticleProps {
  articleId: number
  isOpen?: boolean
}

export function Similar({ articleId, isOpen }: ArticleProps) {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isOpen) return

    const fetchArticles = async () => {
      setLoading(true)
      try {
        const data = await fetchSimilarArticles(articleId)
        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [articleId, isOpen])

  const renderLoading = () => <FeedSkeleton numItems={3} />

  const renderArticleList = () => (
    <div className='grid grid-cols-1'>
      {articles.map((article) => (
        <ArticlePreview key={article.id} article={article} category='best' />
      ))}
    </div>
  )

  const renderNoArticles = () => (
    <p className='text-center text-gray-500'>
      No semantically similar articles found
    </p>
  )

  if (loading) return renderLoading()
  if (articles.length > 0) return renderArticleList()
  return renderNoArticles()
}

export default Similar

export function SimilarDialog({ articleId }: { articleId: number }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Find Similar</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Semantic search</DialogTitle>
          <DialogDescription>More articles like this</DialogDescription>
        </DialogHeader>
        <Similar articleId={articleId} isOpen={open} />
      </DialogContent>
    </Dialog>
  )
}
