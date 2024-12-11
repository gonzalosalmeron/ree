import Image from 'next/image'
import { Velustro } from 'uvcanvas'

import FormSignin from '@/components/auth/form-signin'

export default function Page() {
  return (
    <section className='flex min-h-screen w-full'>
      <div className='flex w-full min-w-[400px] flex-col justify-between px-6 py-10 lg:max-w-2xl'>
        <div className='flex items-center gap-2'>
          <Image
            width={300}
            height={40}
            src='/logo.avif'
            className='w-16'
            alt='REE'
          />
          <p className='text-lg font-bold uppercase'>Ree</p>
        </div>
        <div className='flex w-full items-center justify-center'>
          <FormSignin />
        </div>
        <p className='text-xs text-secondary-foreground/60'>® REE 2024</p>
      </div>
      <div className='hidden w-full p-4 lg:block'>
        <div className='h-full w-full overflow-hidden rounded-xl'>
          <Velustro />
        </div>
      </div>
    </section>
  )
}
