import React, { ReactNode, useState } from 'react';
import { Spin, message } from 'antd';
import { loginUrl } from '@/config';
import { useGetUserInfo, useLogout } from '@/api/user';
import { clearCacheByKey } from '@/utils/common';
import { useMount } from 'ahooks';
import { IUserProps } from '@/types/user';
import actions from '@/micro/actions';

const AuthContext = React.createContext<
  | {
      publicParams: any;
      userInfo: Partial<IUserProps> | null;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // appData: 包含：用户信息，公共参数：如角色、区域等
  const [appData, setAppData] = useState<{
    userInfo: IUserProps;
    publicParams?: any;
  } | null>(null);

  const { run: userRun } = useGetUserInfo();
  const { run: logoutRun } = useLogout();

  // 退出方法
  const logout = () => {
    return logoutRun().then(() => {
      clearCacheByKey('ticket');
      message.success('退出成功');
    });
  };

  // 获取用户信息
  const bootstrapUser = async () => {
    userRun().then(res => {
      setAppData({ userInfo: res });
    });
  };

  useMount(() => {
    if (process.env.REACT_APP_RUNTYPE !== 'micro') {
      // 非micro模式时，手动获取用户信息
      bootstrapUser();
    }
    // micro: 注册监听函数
    actions.onGlobalStateChange((state: any) => {
      setAppData(state);
    }, true);
  });

  if (!appData?.userInfo) {
    return <Spin className='layout-loading' />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{
        userInfo: appData?.userInfo,
        publicParams: appData?.publicParams,
        logout: logout,
      }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};
