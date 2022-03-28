const path = require('path');

module.exports = {
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
  webpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
