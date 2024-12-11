'use server'

import { signIn } from 'auth'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { z } from 'zod'

import { validateFormData } from '@/libs/utils'

export const signInCredentials = async (_: unknown, formData: FormData) => {
  const userSchema = z.object({
    email: z.string().email().min(4).max(255),
    password: z.string().min(1).max(255),
  })
  const validate = await validateFormData(
    userSchema,
    Object.fromEntries(formData)
  )
  if (validate.result != 'ok')
    return { result: 'error', errors: validate.errors }

  try {
    await signIn('credentials', {
      ...validate.data,
      redirectTo: '/',
    })
  } catch (error) {
    if (isRedirectError(error)) throw error
    return {
      result: 'error',
      errors: { password: 'Invalid email or password' },
    }
  }
}
