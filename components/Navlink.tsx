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
          'transition-colors duration-300 my-1 hover:bg-slate-100 px-3 py-2 rounded-md cursor-pointer',
          isActive ? 'bg-slate-200 hover:bg-slate-200' : null
        )}
      >
        {children}
      </div>
    </Link>
  )
}
