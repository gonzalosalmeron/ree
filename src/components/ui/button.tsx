import * as React from 'react'

import { cn } from '@/libs/utils'

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { label?: string; error?: string }
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'bg-primary text-secondary rounded-md px-4 py-2',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export default Button
