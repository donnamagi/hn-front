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
    <div className='my-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <OfferCard
          title='Recent AI News'
          description='Get a recap'
          features={[
            'This weeks AI breakthroughs',
            'Community discussions',
            '3 minute recap'
          ]}
          buttonText='Download'
        />
        <OfferCard
          title='Trending Topics'
          description='Hottest of HN'
          features={[
            'Hottest topics of HN',
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
            'Delivered weekly via WhatsApp',
            '7-10 minute episodes'
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
    <Card className='shadow-none border-slate-800 relative'>
      <div className='absolute -top-2 -right-2 bg-primary text-xs px-2 py-1 text-white rounded-full transform rotate-12'>
        Coming Soon
      </div>
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
        <div className='w-full'>
          <Button
            className='border-primary text-primary hover:text-primary w-full'
            variant='outline'
            disabled
          >
            {buttonText === 'Download' ? <DownloadIcon /> : buttonText}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
