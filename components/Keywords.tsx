'use client'

import React, { useEffect, useState } from 'react'
import { fetchTopKeywords } from '@/lib/utils'

export function Keywords() {
  const [keywords, setKeywords] = useState([])

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const data = await fetchTopKeywords(30)
        setKeywords(data)
      } catch (error) {
        console.error('Error fetching keywords:', error)
      }
    }

    fetchKeywords()
  }, [])

  return (
    <>
      <h1 className='text-lg md:text-xl font-bold my-5'>
        Most common keywords on HN
      </h1>
      {keywords.length !== 0 && (
        <div className='gap-2 flex flex-wrap'>
          {keywords.map((keyword: any) => (
            <span key={keyword[0]} className='badge'>
              {keyword[0]}{' '}
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export default Keywords
