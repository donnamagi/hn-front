'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function BackButton() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <Button variant='outline' size={'sm'} onClick={handleGoBack}>
      <ArrowLeftIcon />
    </Button>
  )
}
