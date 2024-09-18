import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'

export default function Component() {
  return (
    <div className=''>
      <div className='flex items-center justify-between my-4 ms-1'>
        <h2 className='text-xl font-light mb-0 pb-0 italic'>
          or get the podcast
        </h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <OfferCard
          title='Recent AI News'
          description='Get a recap'
          features={[
            'An update on this weeks breakthroughs',
            'Curated by the Hacker News community',
            '3 minute recap'
          ]}
          buttonText='Download'
        />
        <OfferCard
          title='Trending Topics'
          description='Hottest of HN'
          features={[
            'Curated from popular tech forums',
            'Best-in-class AI narration',
            '3 minute recap'
          ]}
          buttonText='Download'
        />
        <OfferCard
          title='Custom Podcast'
          description='Tailored to your interests'
          features={[
            'You choose the topics',
            'Best-in-class AI narration',
            'Scheduled weekly WhatsApp delivery',
            '2-7 minute episodes'
          ]}
          buttonText='Subscribe for 5€/week'
        />
      </div>
    </div>
  )
}

export const OfferCard = ({
  title,
  description,
  features,
  buttonText
}: {
  title: string
  description: string
  features: string[]
  buttonText: string
}) => {
  return (
    <Card className='shadow-none border-slate-800'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='list-disc list-inside text-muted-foreground text-sm mt-auto mb-0'>
          {features.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className='mt-auto mb-0 flex justify-center'>
        <Button
          className='border-primary text-primary hover:text-primary w-full'
          variant='outline'
        >
          {buttonText === 'Download' ? <DownloadIcon /> : buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
