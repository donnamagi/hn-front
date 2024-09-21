import Podcasts from '@/components/Podcasts'
import { ScrollArea } from '@/components/ui/scroll-area'
import PageWrap from '@/components/ui/page-wrap'

export default function Page() {
  return (
    <ScrollArea>
      <PageWrap>
        <h4 className='text-xl md:text-3xl font-bold tracking-tight'>
          Podcasts
        </h4>
        <p>Listen to the latest of Hacker News News</p>
        <Podcasts />
      </PageWrap>
    </ScrollArea>
  )
}
