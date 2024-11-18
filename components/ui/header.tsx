'use client'

import { memo, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChevronLeftIcon } from '@/lib/icons'

import { Button } from '@/components/ui/button'
const MobileDrawer = dynamic(() =>
  import('@/components/ui/mobile-drawer').then((mod) => mod.MobileDrawer)
)

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20

export const FloatingHeader = memo(
  ({
    scrollTitle,
    title,
    goBackLink,
    children
  }: {
    scrollTitle?: string
    title?: string
    goBackLink?: string
    children?: React.ReactNode
  }) => {
    const [transformValues, setTransformValues] = useState({
      translateY: 0,
      opacity: scrollTitle ? 0 : 1
    })

    useEffect(() => {
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

      const onScroll = (e: Event) => {
        // Get scroll position from scroll container
        const scrollY = (e.target as HTMLElement).scrollTop

        // Calculate how much to translate the header (0-100%)
        // As user scrolls down, translateY decreases from 100 to 0
        const translateY = Math.max(100 - scrollY, 0)

        // Calculate opacity of header text (0-1)
        // Starts at 0, gradually increases to 1 as user scrolls past threshold
        const opacity = Math.min(
          Math.max(
            Number(
              (
                (scrollY -
                  MOBILE_SCROLL_THRESHOLD *
                    (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) /
                100
              ).toFixed(2)
            ),
            0
          ),
          1
        )

        // Update header transform values
        setTransformValues({ translateY, opacity })
      }

      if (scrollTitle) {
        scrollAreaElem?.addEventListener('scroll', onScroll, {
          passive: true
        })
      }
      return () => scrollAreaElem?.removeEventListener('scroll', onScroll)
    }, [scrollTitle])

    return (
      <header className='sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-white text-sm font-medium lg:hidden'>
        <div className='flex size-full items-center px-3'>
          <div className='flex w-full items-center justify-between gap-2'>
            <div className='flex flex-1 items-center gap-1'>
              {goBackLink ? (
                <Button
                  variant='ghost'
                  size='icon'
                  className='shrink-0'
                  asChild
                >
                  <Link href={goBackLink} title='Go back'>
                    <ChevronLeftIcon />
                  </Link>
                </Button>
              ) : (
                <MobileDrawer />
              )}
              <div className='flex flex-1 items-center justify-between'>
                {scrollTitle && (
                  <span
                    className='line-clamp-2 font-semibold tracking-tight'
                    style={{
                      transform: `translateY(${transformValues.translateY}%)`,
                      opacity: transformValues.opacity
                    }}
                  >
                    {scrollTitle}
                  </span>
                )}
                {title && (
                  <span className='line-clamp-2 font-semibold tracking-tight'>
                    {title}
                  </span>
                )}
              </div>
            </div>
            <div className='flex min-w-[50px] justify-end'>{children}</div>
          </div>
        </div>
      </header>
    )
  }
)
