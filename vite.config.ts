import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      // 兼容 webpack 语法：@import '~antd/dist/antd.less';
      { find: /^~antd/, replacement: 'antd' },
    ],
  },
  define: {
    // 由于vite去除了process.env，所以这里重新定义下
    // 它的值是，所有以REACT_APP_开头的环境变量
    'process.env': loadEnv(process.env.NODE_ENV, process.cwd(), 'REACT_APP_'),
  },
  server: {
    proxy: {
      '/digital-platform': {
        target: 'http://223.4.78.73:8100/',
        changeOrigin: true,
      },
      '/robot': {
        target: 'https://oapi.dingtalk.com/',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
