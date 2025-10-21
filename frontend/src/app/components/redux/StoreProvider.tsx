'use client';

import { AppStore, makeStore } from '@/common/redux/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
