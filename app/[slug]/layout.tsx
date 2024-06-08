import SideMenu from '@/components/ui/side-menu'
import { Feed } from '@/components/Feed'
import { MAIN_NAV } from '@/lib/constants'
import { notFound } from 'next/navigation'

interface FeedLayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export default function FeedLayout({ children, params }: FeedLayoutProps) {
  const { slug } = params

  if (!MAIN_NAV[slug]) {
    return notFound()
  }

  return (
    <>
      <div className='flex w-full'>
        <SideMenu title={MAIN_NAV[slug].label} isInner>
          <Feed category={slug} />
        </SideMenu>
        <div className='lg:bg-grid flex-1'>{children}</div>
      </div>
    </>
  )
}
