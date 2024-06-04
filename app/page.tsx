import React from 'react'
import Feed from '@/components/Feed'

export default function Page() {
  return (
    <main>
      <div className='flex flex-col items-center justify-between'>
        <Feed />
      </div>
    </main>
  )
}
