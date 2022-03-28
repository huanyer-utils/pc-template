/// <reference types="react-scripts" />
// 全局类型定义
declare namespace def {
  // 分页类型
  export interface IPageProps {
    pageNum: number;
    pageSize: number;
  }
}

declare interface Window {
  __POWERED_BY_QIANKUN__: any;
  __webpack_public_path__: any;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any;
}

declare let __webpack_public_path__;

declare module '*.module.less';
