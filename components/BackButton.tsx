'use client'

import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function BackButton() {
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  useLayoutEffect(() => {
    const comingFromSameDomain = document.referrer.includes(
      window.location.origin
    )
    setShowButton(comingFromSameDomain)
  }, [])

  if (!showButton) {
    return null
  }

  return (
    <Button variant='outline' size='sm' onClick={() => router.back()}>
      <ArrowLeftIcon />
    </Button>
  )
}
