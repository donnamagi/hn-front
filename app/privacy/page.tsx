import React from 'react'
import PageWrap from '@/components/ui/page-wrap'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Privacy() {
  return (
    <ScrollArea>
      <PageWrap>
        <h4 className='text-xl md:text-3xl font-bold tracking-tight'>
          Privacy Policy
        </h4>
        <p>Last updated: September 21, 2024</p>
        <div className='border-t border-gray-200 mt-5'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Information Collection and Use
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We collect and use the following types of information for
                service provisioning and improvement:
                <ul>
                  <li>Email address</li>
                  <li>Payment information</li>
                </ul>
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Data Collection Methods
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We may use cookies and similar tracking technologies to track
                activity on our Service and hold certain information.
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Data Sharing
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We do not share any personal data with third parties except as
                necessary to provide the service or comply with the law.
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Childrens Privacy
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                children under 13.
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Updates to the Privacy Policy
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Contact Us</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                If you have any questions about this Privacy Policy, please
                contact us at:
                <a
                  href='mailto:hello@donnamagi.com'
                  className='text-blue-600 hover:text-blue-800'
                >
                  hello@donnamagi.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </PageWrap>
    </ScrollArea>
  )
}
