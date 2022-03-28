import { addLogger } from '@/api/user';
import { useEffect } from 'react';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import { RouteConfig } from './RouteConfig';

const RouteView = () => {
  const location = useLocation();

  useEffect(() => {
    // 线上环境，访问页面时，存储日志,
    // key为default时，为重定向页面，不输出日志
    if (
      process.env.REACT_APP_ENV === 'production' &&
      location.key !== 'default'
    ) {
      addLogger({ pageName: location.pathname });
    }
  }, [location.key, location.pathname]);

  return useRoutes(RouteConfig);
};

export const AppRouter = () => {
  return (
    <BrowserRouter basename={`/${process.env.REACT_APP_BASENAME || ''}`}>
      <RouteView />
    </BrowserRouter>
  );
};
