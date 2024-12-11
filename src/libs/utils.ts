import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError, ZodSchema } from 'zod'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const validateFormData = async (
  schema: ZodSchema,
  formData: Record<string | number, unknown>
): Promise<{
  result: 'ok' | 'error'
  data?: Record<string | number, string | number>
  errors?: Record<string, string>
}> => {
  try {
    const parse = schema.parse(formData)
    return { result: 'ok', data: parse }
  } catch (e) {
    if (e instanceof ZodError) {
      const rawErrors = e.errors
      let errors = {}
      for (const [, { path, message }] of Object.entries(rawErrors)) {
        errors = { ...errors, [path[0]]: message }
      }
      return { result: 'error', errors }
    }
    return { result: 'error', errors: {} }
  }
}
