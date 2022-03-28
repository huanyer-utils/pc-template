import React from 'react';
import ErrorPage from '@/pages/Error';
import { Outlet, Location } from 'react-router-dom';

interface IProps {
  location?: Location;
}
interface IState {
  hasError: boolean;
  pathname: string;
}
class ErrorCatchLayout extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      pathname: props?.location?.pathname,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (error?.toString().includes('ChunkLoadError')) {
      // 如果是loadingChunk错误，通过刷新页面即可修复
      // 为了避免循环刷新，引入chunkErrorRefresh判断是否刷新过了
      if (sessionStorage.getItem('chunkErrorRefresh') !== 'true') {
        sessionStorage.setItem('chunkErrorRefresh', 'true');
        window.location.reload();
        return;
      }
      sessionStorage.removeItem('chunkErrorRefresh');
      return;
    }
  }

  // 通过监听pathname的变化，切换回正常页面。
  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.location?.pathname !== state.pathname) {
      return {
        pathname: props.location?.pathname,
        hasError: false,
      };
    }
    return null;
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage type='error' content='页面异常，请刷新页面或重新进入' />
      );
    }
    return this.props.children;
  }
}

export default ErrorCatchLayout;
