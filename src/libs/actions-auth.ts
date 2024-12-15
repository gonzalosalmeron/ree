'use server'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { signIn } from 'auth'
import { compare, hash } from 'bcryptjs'
import prisma from 'db'
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

export const getUserFromDb = async (email: string) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    })
    return user
  } catch (e) {
    // TODO - LOG INTO SYSTEM
    // ex: elastic search, custom db system, etc
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
      console.error('User not found on database')
    } else {
      console.error(`Error getting user from db ${e}`)
    }

    return null
  }
}

export const signUpCredentials = async (_: unknown, formData: FormData) => {
  const userSchema = z
    .object({
      name: z.string().min(4).max(100),
      email: z.string().email().min(4).max(255),
      newPass: z.string().min(1).max(255),
      repeatPass: z.string().min(1).max(255),
    })
    .refine((data) => data.newPass === data.repeatPass, {
      message: "Passwords don't match",
      path: ['newPass'],
    })

  const validate = await validateFormData(
    userSchema,
    Object.fromEntries(formData) as never
  )

  if (validate.result != 'ok' || !validate.data)
    return { result: 'error', errors: validate.errors }

  const { name, email, newPass } = validate.data

  // CHEKS IF USER EXISTS, IF NOT, RETURN ERROR
  const userExists = await getUserFromDb(email as string)

  if (userExists) {
    return {
      result: 'error',
      errors: { email: 'Email already registered' },
    }
  }

  try {
    const hashedPass: string = await hashPassword(newPass as string)

    await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPass,
      },
    })

    await signIn('credentials', {
      email: email as string,
      password: newPass as string,
      redirectTo: '/dashboard',
    })

    return {
      result: 'ok',
    }
  } catch (error) {
    if (isRedirectError(error)) throw error
    // TODO - register error
    console.error(error)
    return {
      result: 'error',
      errors: { email: 'Service unavailable, try again later.' },
    }
  }
}

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export const isPasswordValid = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
