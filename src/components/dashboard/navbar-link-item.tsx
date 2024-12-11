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
        'rounded-md px-4 py-2 text-secondary-foreground/60',
        active && 'bg-accent/10 font-medium text-accent'
      )}
    >
      {children}
    </Link>
  )
}
