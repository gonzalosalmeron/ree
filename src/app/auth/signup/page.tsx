import { Velustro } from 'uvcanvas'

import FormSignup from '@/components/auth/form-signup'
import Brand from '@/components/ui/brand'

export default function Page() {
  return (
    <section className='flex min-h-screen w-full'>
      <div className='flex w-full min-w-[400px] flex-col justify-between px-6 py-10 lg:max-w-2xl'>
        <Brand />
        <div className='flex w-full items-center justify-center'>
          <FormSignup />
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
