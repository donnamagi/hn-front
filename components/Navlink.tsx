'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavlinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export function Navlink({ href, children }: NavlinkProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <Link href={href}>
      <div
        className={cn(
          'transition-colors duration-300 my-3 text-sm',
          isActive ? 'text-neutral-800' : 'text-neutral-400'
        )}
      >
        {children}
      </div>
      <hr />
    </Link>
  )
}
