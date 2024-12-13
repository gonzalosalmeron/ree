'use client'

import Link, { type LinkProps } from 'next/link'

import { cn } from '@/libs/utils'

export default function NavbarLinkItem({
  children,
  active = false,
  ...props
}: LinkProps & { children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      {...props}
      className={cn(
        'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-secondary-foreground/60',
        active && 'bg-accent/10 font-medium text-accent'
      )}
    >
      {children}
    </Link>
  )
}
