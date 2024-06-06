import SideMenu from '@/components/ui/side-menu'
import Feed from '@/components/Feed'

export default async function BestLayout({ children }: any) {
  return (
    <>
      <div className='flex w-full'>
        <SideMenu title='Best' isInner>
          <Feed category='beststories' />
        </SideMenu>
        <div className='lg:bg-grid flex-1'>{children}</div>
      </div>
    </>
  )
}
