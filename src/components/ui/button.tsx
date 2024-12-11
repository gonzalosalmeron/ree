import * as React from 'react'

import { cn } from '@/libs/utils'

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { label?: string; error?: string }
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'rounded-md bg-primary px-4 py-2 text-secondary disabled:cursor-not-allowed disabled:bg-primary/75',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export default Button
