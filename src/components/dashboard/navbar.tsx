import { Suspense } from 'react'

import {
  ArrowTrendingDownIcon,
  BoltIcon,
  Cog8ToothIcon,
  SquaresPlusIcon,
} from '@heroicons/react/16/solid'

import NavbarLinkItem from '@/components/dashboard/navbar-link-item'
import NavbarUserProfile, {
  Skeleton,
} from '@/components/dashboard/navbar-user-profile'
import Brand from '@/components/ui/brand'

const tabs = [
  {
    href: '/dashboard',
    name: 'Dashboard',
    icon: <SquaresPlusIcon className='h-4 w-4' />,
  },
  {
    href: '/dashboard',
    name: 'Performances',
    icon: <BoltIcon className='h-4 w-4' />,
  },
  {
    href: '/dashboard',
    name: 'Solar Sites',
    icon: <ArrowTrendingDownIcon className='h-4 w-4' />,
  },
  {
    href: '/dashboard',
    name: 'Settings',
    icon: <Cog8ToothIcon className='h-4 w-4' />,
  },
]

export default function Navbar() {
  return (
    <div>
      <nav className='border-b px-8 py-3'>
        <div className='width-layout mx-auto flex w-full items-center justify-between gap-8'>
          <div className='flex items-center gap-16'>
            <Brand />
          </div>

          <Suspense fallback={<Skeleton />}>
            <NavbarUserProfile />
          </Suspense>
        </div>
      </nav>
      <nav className='border-b bg-white py-2'>
        <ul className='width-layout flex items-center gap-2.5'>
          {tabs.map(({ href, name, icon }, i) => (
            <li key={i}>
              <NavbarLinkItem href={href} active={i == 0}>
                {icon}
                <span>{name}</span>
              </NavbarLinkItem>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
