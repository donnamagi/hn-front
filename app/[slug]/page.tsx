import { FloatingHeader } from '@/components/ui/header'
import { Feed } from '@/components/Feed'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <>
      <FloatingHeader scrollTitle={slug} />
      <Feed category={slug} />
    </>
  )
}
