import SideMenu from '@/components/ui/side-menu'
import { DBFeed } from '@/components/DBFeed'

interface FeedLayoutProps {
  children: React.ReactNode
}

export default function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <>
      <div className='flex w-full'>
        <SideMenu isInner>
          <DBFeed />
        </SideMenu>
        <div className='flex-1'>{children}</div>
      </div>
    </>
  )
}
