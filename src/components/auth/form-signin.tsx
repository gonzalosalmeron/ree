'use client'

import { useFormState, useFormStatus } from 'react-dom'

import IconLoading from '../icons/icon-loading'
import Link from 'next/link'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

import { signInCredentials } from '@/libs/actions-auth'

export default function FormSignin() {
  const [state, dispatch] = useFormState(signInCredentials, null)

  return (
    <form action={dispatch} className='flex w-full max-w-lg flex-col gap-3'>
      <video
        src='/ree-video.mp4'
        autoPlay
        loop
        muted
        className='mx-auto w-20'
      />
      <div className='pb-4'>
        <h1 className='pb-4 text-5xl font-medium'>
          Visualize the Spanish power grid, effortlessly
        </h1>
        <h4>
          Create an account or log in to explore Spain's power grid with ease.
        </h4>
      </div>
      <Input label='Email' name='email' />
      <Input
        label='Password'
        name='password'
        type='password'
        error={state?.errors?.password}
      />
      <BtnSubmit />
      <div>
        <p className='text-sm text-secondary-foreground/60'>
          Don´t have an account?
          <span className='text-secondary-foreground hover:underline'>
            <Link href={'/auth/signup'}> Sign up here</Link>
          </span>
        </p>
      </div>
    </form>
  )
}

const BtnSubmit = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='flex items-center justify-center gap-2'
    >
      {!pending ? 'Sign in' : <IconLoading className='inline-flex' />}
    </Button>
  )
}
