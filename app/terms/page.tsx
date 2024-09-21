import React from 'react'
import PageWrap from '@/components/ui/page-wrap'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Terms() {
  return (
    <ScrollArea>
      <PageWrap>
        <h4 className='text-xl md:text-3xl font-bold tracking-tight'>
          Terms of Service
        </h4>
        <p>Last updated: September 21, 2024</p>
        <div className='border-t border-gray-200 mt-5'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Acceptance of Terms
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                By accessing or using the Service, you agree to be bound by
                these terms. If you disagree with any part of the terms, you may
                not access the Service.
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Governing Law
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                These terms are governed by the laws of Estonia.
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Cookies and Data Use
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We use cookies to collect non-personal information about
                interactions with our website. For more information on how we
                collect, use, and disclose personal information, please refer to
                our Privacy Policy.
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Payment Processor
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We use Stripe for processing payments.
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Modifications to Terms
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                We reserve the right to modify these terms at any time. Changes
                will be posted on this page.
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Contact Us</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                If you have any questions about these terms, please contact us
                at:{' '}
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
