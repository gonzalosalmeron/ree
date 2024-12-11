'use client'

import * as React from 'react'

import { cn } from '@/libs/utils'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn(className)} {...props} />
))

Label.displayName = 'Label'

export default Label
