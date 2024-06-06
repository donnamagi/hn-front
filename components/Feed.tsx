'use client'

import { useState, useMemo } from 'react'
import { Article } from '@/components/Article'
import { fetchStoryIds } from '@/lib/utils'

export function Feed({ category }: { category: string }) {
  const [storyIds, setStoryIds] = useState<number[]>([])

  const getStoryIds = async () => {
    try {
      const data = await useMemo(() => fetchStoryIds(category), [category])
      setStoryIds(data)
    } catch (err) {
      console.error('Error fetching story IDs:', err)
    }
  }

  getStoryIds()

  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='flex flex-items-center justify-between'>
          <div>
            {storyIds.length > 0
              ? storyIds.map((id) => <Article key={id} storyId={id} />)
              : null}
          </div>
        </div>
      </div>
    </main>
  )
}
