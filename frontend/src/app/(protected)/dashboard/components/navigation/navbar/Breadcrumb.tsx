'use client';

import { HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import clsx from 'clsx';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const allSegments = pathname.split('/').filter(Boolean);
  const paths = allSegments.map(
    (_, index) => '/' + allSegments.slice(0, index + 1).join('/')
  );

  const visibleSegments =
    pathname === '/dashboard'
      ? allSegments
      : allSegments.filter((segment) => segment !== 'dashboard');

  const format = (text: string) =>
    text.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col gap-3">
      <nav
        className="
          flex flex-wrap 
          items-center 
          text-sm text-gray-400 
          max-w-full
          gap-x-2 gap-y-1 -mb-3
        "
      >
        <Link
          href="/dashboard"
          className="flex items-center text-white/50 transition-colors"
        >
          <HomeIcon className="h-3.5 w-3.5 shrink-0" />
        </Link>

        {visibleSegments.map((segment, index) => {
          const realIndex = allSegments.indexOf(segment);
          const href = paths[realIndex];
          const isLast = index === visibleSegments.length - 1;

          return (
            <React.Fragment key={segment}>
              <span className="text-white select-none">/</span>

              <Link
                href={href}
                className={clsx(
                  'capitalize font-medium transition-colors truncate max-w-40',
                  isLast ? 'text-white' : 'text-white/50'
                )}
              >
                {format(segment)}
              </Link>
            </React.Fragment>
          );
        })}
      </nav>

      <h1 className="text-[17px] font-special font-semibold text-white">
        {visibleSegments.length === 0
          ? 'Dashboard'
          : format(visibleSegments[visibleSegments.length - 1])}
      </h1>
    </div>
  );
};

export default Breadcrumb;
