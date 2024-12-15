'use client'

import { useFormState, useFormStatus } from 'react-dom'

import IconLoading from '../icons/icon-loading'
import Link from 'next/link'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

import { signUpCredentials } from '@/libs/actions-auth'

export default function FormSignup() {
  const [state, dispatch] = useFormState(signUpCredentials, null)

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
          Create a new account now, for free
        </h1>
        <h2>Log in or register now to explore Spain's power grid with ease.</h2>
      </div>
      <div className='flex flex-col items-start gap-3 md:flex-row'>
        <Input label='Name' name='name' error={state?.errors?.name} />
        <Input label='Email' name='email' error={state?.errors?.email} />
      </div>
      <Input
        label='Password'
        name='newPass'
        type='password'
        error={state?.errors?.newPass}
      />
      <Input
        label='Repeat password'
        name='repeatPass'
        type='password'
        error={state?.errors?.repeatPass}
      />
      <BtnSubmit />
      <div>
        <p className='text-sm text-secondary-foreground/60'>
          Already have an account?
          <span className='text-secondary-foreground hover:underline'>
            <Link href={'/auth/signin'}> Sign in here</Link>
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
