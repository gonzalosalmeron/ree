import * as React from 'react'

import Label from '@/components/ui/label'

import { cn } from '@/libs/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { label?: string; error?: string }
>(({ label, className, type, error, ...props }, ref) => {
  return (
    <div className='w-full'>
      {label && <Label htmlFor={props?.name}>{label}</Label>}
      <input
        type={type}
        className={cn('input-style', className)}
        ref={ref}
        id={props?.id || props?.name}
        {...props}
      />
      {error && <p className='pt-1.5 text-xs text-red-500'>{error}</p>}
    </div>
  )
})
Input.displayName = 'Input'

export default Input
