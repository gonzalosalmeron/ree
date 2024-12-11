import { auth } from 'auth'

import IconSettings from '@/components/icons/icon-settings'

export default async function NavbarUserProfile() {
  const session = await auth()

  return (
    <div className='flex items-center gap-2'>
      <button>
        <IconSettings />
      </button>
      <div className='mx-1 h-8 border-[0.5px] border-border'></div>
      <div className='relative'>
        <div id='btn-show-menu-options-r0'>
          <div className='flex items-center gap-2'>
            <div className='mt-0.5 flex aspect-square h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent'>
              <p className='text-lg uppercase text-accent-foreground'>g</p>
            </div>
            <div className='hidden overflow-hidden sm:block'>
              <p className='truncate text-[14.5px] text-primary'>
                {session?.user?.name}
              </p>
              <p className='truncate text-xs text-secondary-foreground/60'>
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Skeleton = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='skeleton mt-0.5 aspect-square h-9 w-9 shrink-0 rounded-full' />
      <div className='hidden overflow-hidden sm:block'>
        <div className='skeleton h-4 w-32 rounded' />
        <div className='skeleton mt-2 h-4 w-40 rounded' />
      </div>
    </div>
  )
}
