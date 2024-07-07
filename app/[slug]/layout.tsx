import SideMenu from '@/components/ui/side-menu'
import { Feed } from '@/components/Feed'
import { MAIN_NAV } from '@/components/Menu'
import { notFound } from 'next/navigation'

interface FeedLayoutProps {
  children: React.ReactNode
  params: {
    slug: string
  }
}

export default function FeedLayout({ children, params }: FeedLayoutProps) {
  const { slug } = params
  const path = `/${slug}`

  if (!MAIN_NAV[path]) {
    return notFound()
  }

  const title = MAIN_NAV[path]?.label
  const description = MAIN_NAV[path]?.description

  return (
    <>
      <div className='flex w-full'>
        <SideMenu isInner>
          <div className='sticky top-0 z-10 border-b bg-zinc-50 py-3'>
            <span className='text-lg font-semibold tracking-tight'>
              {title}
            </span>
            <p className='text-sm text-neutral-700'> {description} </p>
          </div>
          <Feed category={slug} />
        </SideMenu>
        <div className='flex-1'>{children}</div>
      </div>
    </>
  )
}
