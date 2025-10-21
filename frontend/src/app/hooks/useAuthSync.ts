'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/common/redux/hooks';
import {
  clearUser,
  fetchMe,
} from '@/common/redux/features/user/slices/user.slice';
import { logout } from '@/common/redux/features/auth/slices/auth.slice';

export const useAuthSync = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userInfo, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      // En client-side no puedes usar next/headers
      const token = document.cookie
        ?.split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1];

      if (token && !userInfo && !loading) {
        dispatch(fetchMe());
      }

      if (!token && userInfo) {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch, userInfo, loading]);

  useEffect(() => {
    if (error === 'Unauthorized' || error === 'Invalid access token') {
      dispatch(logout());
      dispatch(clearUser());
      router.push('/sign-in');
    }
  }, [error, dispatch, router]);
};
