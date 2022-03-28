import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';
import ErrorCatchLayout from '@/components/widgets/ErrorCatch';
import { Outlet, useLocation } from 'react-router-dom';

import './index.less';

const AuthLayout = () => {
  const location = useLocation();
  const isMicro = process.env.REACT_APP_RUNTYPE === 'micro';
  return (
    <div className='page-basic'>
      {!isMicro && <Header />}
      <div className='content'>
        {!isMicro && <Menu location={location} />}
        <ErrorCatchLayout location={location}>
          <div className='page-body'>
            <Outlet />
          </div>
        </ErrorCatchLayout>
      </div>
    </div>
  );
};

export default AuthLayout;
