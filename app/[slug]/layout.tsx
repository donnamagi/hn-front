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

  if (!MAIN_NAV.find((nav) => nav.href === `/${slug}`)) {
    return notFound()
  }

  const title = MAIN_NAV.find((nav) => nav.href === `/${slug}`)?.label

  return (
    <>
      <div className='flex w-full'>
        <SideMenu isInner>
          {title && (
            <div className='sticky top-0 z-10 border-b bg-zinc-50 py-3'>
              <span className='text-lg font-semibold tracking-tight'>
                {title}
              </span>
            </div>
          )}
          <Feed category={slug} />
        </SideMenu>
        <div className='flex-1'>{children}</div>
      </div>
    </>
  )
}
