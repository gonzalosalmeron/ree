import React from 'react'

import { cn } from '@/libs/utils'

export default function Container({
  title,
  children,
  className,
}: React.ComponentProps<'div'> & { title?: string }) {
  return (
    <div
      className={cn(
        'width-layout rounded-xl border bg-background px-6 pb-9 pt-4',
        className
      )}
    >
      {title && (
        <h4 className='text-xs font-medium uppercase text-secondary-foreground/60'>
          {title}
        </h4>
      )}
      {children}
    </div>
  )
}
