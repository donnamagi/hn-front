'use client'

import React, { useEffect, useState } from 'react'
import { ArticleCard } from '@/components/Card'
import { useArticles } from '@/lib/hooks'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Recents: React.FC = () => {
  const { articles, getArticles } = useArticles()

  useEffect(() => {
    getArticles('best', 6)
  }, [])

  return (
    <div className=''>
      <div className='flex items-center justify-between my-4 ms-1'>
        <h2 className='text-xl font-bold mb-0 pb-0'>Best of this week</h2>
        <div>
          <Link href='/best' className={buttonVariants({ variant: 'outline' })}>
            See all
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Recents
