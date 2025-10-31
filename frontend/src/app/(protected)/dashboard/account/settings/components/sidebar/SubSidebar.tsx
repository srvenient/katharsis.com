'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RocketLaunchIcon,
  DocumentTextIcon,
  CubeIcon,
  ShieldCheckIcon,
  UsersIcon,
  BellIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
} from '@heroicons/react/24/solid';

interface SubSidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const items: SubSidebarItem[] = [
  {
    label: 'Profile',
    href: '/dashboard/settings/profile',
    icon: RocketLaunchIcon,
  },
  {
    label: 'Basic Info',
    href: '/dashboard/settings/info',
    icon: DocumentTextIcon,
  },
  {
    label: 'Change Password',
    href: '/dashboard/settings/password',
    icon: CubeIcon,
  },
  { label: '2FA', href: '/dashboard/settings/2fa', icon: ShieldCheckIcon },
  { label: 'Accounts', href: '/dashboard/settings/accounts', icon: UsersIcon },
  {
    label: 'Notifications',
    href: '/dashboard/settings/notifications',
    icon: BellIcon,
  },
  {
    label: 'Sessions',
    href: '/dashboard/settings/sessions',
    icon: WrenchScrewdriverIcon,
  },
  {
    label: 'Delete Account',
    href: '/dashboard/settings/delete',
    icon: CreditCardIcon,
  },
];

export default function SubSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={`
        sticky 
        flex flex-col
        w-96 h-fit
        overflow-hidden
        backdrop-blur-[120px]
        bg-[linear-gradient(127.09deg,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
        shadow-[0_1.25rem_1.6875rem_0_rgba(0,0,0,0.05)]
        border border-[rgba(0,0,0,0.125)]
        rounded-[0.9375rem]
        px-[22px] py-[22px]
        text-sm text-[rgba(0,0,0,0.87)]
        transition-shadow duration-300 ease-in-out
      `}
    >
      <nav className="flex flex-col space-y-2.5">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center rounded-lg px-4 py-2.5 
                text-[0.875rem] leading-normal capitalize
              text-white font-normal
                transition-colors duration-200 ease-in-out
                ${isActive ? 'bg-white/10 font-medium' : 'hover:bg-gray-600/50'}
                gap-3
              `}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
