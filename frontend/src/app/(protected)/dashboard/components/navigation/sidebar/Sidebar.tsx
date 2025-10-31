import React from 'react';
import { Cog8ToothIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Category {
  label: string;
  items: NavItem[];
}

interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  path?: string;
  subItems?: SubNavItem[];
}

interface SubNavItem extends NavItem {
  active?: boolean;
}

const NavItem: React.FC<{ item: NavItem; isActive: boolean }> = ({
  item,
  isActive,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href={item.path || '#'}
        className={`
          group flex items-center gap-3 rounded-2xl py-3 px-3.5 transition-all
          ${isActive ? 'bg-[rgb(26,31,55)] active' : ''}
        `}
      >
        <div
          className={`
            flex items-center justify-center rounded-xl p-2 transition-all
            bg-[rgb(26,31,55)] group-[.active]:bg-blue-500
          `}
        >
          {item.icon && (
            <item.icon className="w-4 h-4 inline-block text-[rgb(0,117,255)] group-[.active]:text-white" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-300 group-[.active]:text-white">
          {item.label}
        </span>
      </Link>
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  const categories: Category[] = [
    {
      label: 'Account',
      items: [
        {
          icon: Cog8ToothIcon,
          label: 'Settings',
          path: '/dashboard/account/settings',
        },
      ],
    },
  ];

  const menuItems: NavItem[] = [
    { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div
      className="
        flex flex-col
        bg-[linear-gradient(127.09deg,rgba(6,11,40,0.94)19.41%,rgba(10,14,35,0.49)76.65%)] 
        rounded-3xl 
        w-62.5 h-[calc(100vh-2rem)]
      text-white py-6.5 px-2.5
      "
    >
      <div className="flex flex-col items-center justify-center gap-1.5 mb-4.5">
        <span
          className="
            text-base font-special font-semibold tracking-widest pointer-events-none 
            bg-linear-to-r from-white via-white to-white/30 text-transparent bg-clip-text
            mb-2
          "
        >
          KATHARSIS
        </span>
        <div className="w-4/5 h-0.5 mx-auto bg-linear-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col justify-center">
        <nav className="space-y-0.5 mb-6">
          {menuItems.map((item) => {
            return (
              <NavItem
                key={item.label}
                item={item}
                isActive={pathname === item.path}
              />
            );
          })}
        </nav>
      </div>

      {/* Category Sections */}
      <div className="flex-1 overflow-y-auto">
        {categories.map((category) => (
          <div key={category.label}>
            <h3 className="text-xs font-special font-bold text-white uppercase tracking-wider mb-5 px-4">
              {category.label}
            </h3>
            <nav className="space-y-0.5">
              {category.items.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={pathname === item.path}
                />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}
