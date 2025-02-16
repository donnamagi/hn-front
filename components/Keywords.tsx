'use client'

import React, { useEffect, useState } from 'react'
import {
  fetchTopKeywords,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from '@/lib/utils'
import { Badge } from './ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export function Keywords() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const data = await fetchTopKeywords(30)
        setKeywords(data)
        checkInterests(data)
      } catch (error) {
        console.error('Error fetching keywords:', error)
      }
    }

    fetchKeywords()
  }, [])

  const checkInterests = (data: string[]) => {
    const localInterests = getLocalStorage('interests')
    setInterests(localInterests)

    // if in interests and not in keywords, add to keywords
    const toAdd = localInterests.filter((i) => !data.includes(i))

    if (toAdd.length !== 0) {
      setKeywords([...data, ...toAdd])
    }
  }

  const addInterest = (keyword: string) => {
    setInterests([...interests, keyword])
    setLocalStorage('interests', keyword)
  }

  const removeInterest = (keyword: string) => {
    setInterests(interests.filter((i) => i !== keyword))
    removeLocalStorage('interests', keyword)
  }

  const toggleInterest = (keyword: string) => {
    if (interests.includes(keyword)) {
      removeInterest(keyword)
    } else {
      addInterest(keyword)
    }
  }

  const clearInterests = () => {
    setInterests([])
    localStorage.removeItem('interests')
  }

  return (
    <>
      {Array.isArray(keywords) && keywords.length !== 0 && (
        <div className='gap-2 flex flex-wrap my-3'>
          {(keywords || []).map((keyword) => (
            <Badge
              key={keyword}
              keyword={keyword}
              interests={interests}
              variant='interactive'
              onClick={() => {
                toggleInterest(keyword)
              }}
            >
              {keyword}
            </Badge>
          ))}
        </div>
      )}
      <div
        className={buttonVariants({ variant: 'link', size: 'sm' })}
        onClick={() => clearInterests()}
      >
        Clear all
      </div>
    </>
  )
}

export function KeywordsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='ms-5'>Set interests</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Most common topics this week</DialogTitle>
          <DialogDescription>Choose your interests</DialogDescription>
        </DialogHeader>
        <Keywords />
      </DialogContent>
    </Dialog>
  )
}
