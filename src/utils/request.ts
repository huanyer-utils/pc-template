/**
 * axios 请求封装，处理响应拦截和请求拦截，通用错误码处理
 */
import axios from 'axios';
import { message } from 'antd';

interface ReqData {
  success: boolean;
  code: string;
  message: string;
  data: any;
}
const request = axios.create({
  timeout: 10000,
});

request.interceptors.request.use((config: any) => {
  // 添加相关认证值到header
  config.headers = {
    ...config.headers,
  };

  return config;
});

request.interceptors.response.use(
  response => {
    const resp = response.data as ReqData;
    // 请求成功
    if (response.status >= 200 && response.status < 300) {
      if (resp.success && resp.code === '200') {
        return resp.data;
      }
      // 401未授权或者授权失效;404用户不存在;405用户无权限
      if (
        ['401', '404', '405'].includes(resp.code) &&
        /**
         * 接口过滤
         * 以下接口不跳转错误页面
         */
        !response.config?.url?.startsWith('/robot') &&
        !response.config?.url?.endsWith('/add-logger')
      ) {
        window.location.href = `${
          process.env.REACT_APP_BASENAME
            ? '/' + process.env.REACT_APP_BASENAME
            : ''
        }/error/401`;
      }
      // 402 未登录
      if (resp.code === '402') {
        // 退出
      }
    }

    message.error(resp.message || '接口出现未定义异常');

    // 将错误信息返回
    return Promise.reject(resp.message || '接口出现未定义异常');
  },
  error => {
    message.error(error?.response?.data?.message || '接口出现异常，请稍后重试');
    return Promise.reject(error);
  }
);

export default request;
