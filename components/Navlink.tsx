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
          'transition-colors duration-100 my-1 hover:bg-primary/10 px-3 py-2 rounded-md cursor-pointer',
          isActive ? 'bg-primary/30 hover:bg-primary/30' : null
        )}
      >
        {children}
      </div>
    </Link>
  )
}
