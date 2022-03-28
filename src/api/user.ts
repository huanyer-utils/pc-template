import { useRequest } from 'ahooks';
import axios from '@/utils/request';
import { IUserProps } from '@/types/user';

export const useCheckTicket = () => {
  return useRequest((params: { ticket: string }) => ({
    url: '/digital-platform/authentication/sso-login',
    method: 'post',
    data: params,
  }));
};

export const useGetUserInfo = () => {
  return useRequest<IUserProps>(() => ({
    url: '/digital-platform/handle/info',
    method: 'post',
  }));
};

export const useLogout = () => {
  return useRequest({
    url: '/digital-platform/authentication/sso-logout',
    method: 'post',
  });
};

export const useUpdatePwd = () => {
  return useRequest((params: { password: string; oldPassword: string }) => ({
    url: '/digital-platform/authentication/update-password',
    method: 'post',
    data: params,
  }));
};

/**
 * 埋点接口
 */
export const addLogger = (params: { pageId?: number; pageName: string }) => {
  return axios.request<any>({
    url: '/digital-platform/access/add-logger',
    method: 'post',
    data: params,
  });
};

// 根据角色编码查询用户信息
export const getUserListByRole = ({
  authorizeCode,
  roleCode,
}: {
  authorizeCode: string;
  roleCode?: string;
}) => {
  return axios.request<any, { records: any[]; total: number }>({
    url: '/digital-platform/user-search/by-role',
    method: 'post',
    data: {
      authorizeCode,
      roleCode,
      pageSize: 1000,
    },
  });
};
