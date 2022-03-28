import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

import AuthLayout from '@/layout/AuthLayout';
import NoPower from '@/pages/Error';
const Home = lazy(() => import('@/pages/Home'));

export const RouteConfig = [
  {
    path: '/error/401', // 401无权限
    element: <NoPower />,
  },
  {
    path: '*',
    element: <AuthLayout />,
    children: [
      {
        path: 'index/system/user', // 首页
        element: (
          <Suspense fallback={<Spin className='layout-loading' />}>
            <Home />
          </Suspense>
        ),
      },
      { path: '*', element: <Navigate replace to='/index/system/user' /> },
    ],
  },
];
