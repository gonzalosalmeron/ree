import { Suspense } from 'react'

import NavbarLinkItem from '@/components/dashboard/navbar-link-item'
import NavbarUserProfile, {
  Skeleton,
} from '@/components/dashboard/navbar-user-profile'
import Brand from '@/components/ui/brand'

const tabs = [
  {
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    href: '/dashboard',
    name: 'Performances',
  },
  {
    href: '/dashboard',
    name: 'Solar Sites',
  },
  {
    href: '/dashboard',
    name: 'Settings',
  },
]

export default function Navbar() {
  return (
    <nav className='border-b px-8 py-3'>
      <div className='mx-auto flex w-full items-center justify-between gap-8'>
        <div className='flex items-center gap-16'>
          <Brand />

          {/* LINKS */}
          <ul className='flex items-center gap-2.5'>
            {tabs.map(({ href, name }, i) => (
              <li key={i}>
                <NavbarLinkItem href={href} active={i == 0}>
                  {name}
                </NavbarLinkItem>
              </li>
            ))}
          </ul>
        </div>

        <Suspense fallback={<Skeleton />}>
          <NavbarUserProfile />
        </Suspense>
      </div>
    </nav>
  )
}
