import Podcasts from '@/components/Podcasts'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Page() {
  return (
    <ScrollArea>
      <div className='content-wrapper'>
        <div className='content p-3 md:p-9'>
          <div className='flex justify-center'>
            <div className='max-w-2xl py-10 text-neutral-800'>
              <h4 className='text-xl md:text-3xl font-bold tracking-tight'>
                Podcasts
              </h4>
              <p>Listen to the latest of Hacker News News</p>
              <Podcasts />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
