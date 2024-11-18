import { FloatingHeader } from '@/components/ui/header'
import { Feed } from '@/components/Feed'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  return (
    <>
      <FloatingHeader scrollTitle={slug} />
      <Feed category={slug} />
    </>
  )
}
