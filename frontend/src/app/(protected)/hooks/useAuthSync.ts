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
      if (!userInfo && !loading) {
        dispatch(fetchMe());
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
