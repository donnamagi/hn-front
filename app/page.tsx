import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='z-10 max-w-5xl items-center justify-center font-mono text-sm'>
          <hr />
          <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold text-neutral-800'>
            Hacker News - without the noise
          </h1>
          <h3 className='text-md md:text-xl text-neutral-600'>
            Set your interests | Get trending articles | Read the best comments
          </h3>
          <i className='text-neutral-600 text-xs md:text-md'>
            With direct links to the original content.
          </i>
          <hr />
          <small>
            This project is not affiliated with Hacker News or Y Combinator.
            With &#x2665; from{' '}
            <Link href='https://github.com/donnamagi'>Donna</Link>{' '}
          </small>
        </div>
      </div>
    </main>
  )
}
