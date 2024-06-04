'use client'

import { useEffect, useState } from 'react'
import Article from './Article'

interface Article {
  by: string
  descendants: number
  hnUrl: string
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
}

type ApiResponse = number[]

export default function StoriesList() {
  const [stories, setStories] = useState<Article[]>([])

  const getStories = async () => {
    try {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: ApiResponse = await response.json()

      const stories = Promise.all(
        data.slice(0, 30).map(async (storyId: number) => {
          const storyResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
          )
          if (!storyResponse.ok) {
            throw new Error('Network response was not ok')
          }
          const storyData: Article = await storyResponse.json()
          return storyData
        })
      )
      setStories(await stories)
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }

  useEffect(() => {
    getStories()
  }, [])

  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='flex flex-items-center justify-between'>
          <div>
            {stories ? (
              stories.map((article) => (
                <Article key={article.id} Article={article} />
              ))
            ) : (
              <div className='mt-4'>Loading stories...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
