import Image from 'next/image'
import { Velustro } from 'uvcanvas'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

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
          <form className='flex w-full max-w-lg flex-col gap-3'>
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
                Create an account or log in to explore Spain's power grid with
                ease.
              </h4>
            </div>
            <Input label='Email' />
            <Input label='Password' type='password' />

            <Button>Sign in</Button>
          </form>
        </div>
        <p className='text-xs text-gray-400'>® REE 2024</p>
      </div>
      <div className='hidden w-full p-4 lg:block'>
        <div className='h-full w-full overflow-hidden rounded-xl'>
          <Velustro />
        </div>
      </div>
    </section>
  )
}
