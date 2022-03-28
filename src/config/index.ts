/**
 * 通用参数配置
 */
// 登录正式环境-待定
let loginHost = 'https://dgov-integrate.zj.gov.cn:8800';
if (
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_ENV === 'development'
) {
  // 登录测试环境
  loginHost = 'http://223.4.78.73:8100';
}
const appCode = 'appCode-template'; //'TMS';
const baseName = process.env.REACT_APP_BASENAME;
const loginUrl = `${loginHost}/login-sso?appCode=${appCode}&from=${encodeURI(
  window.location.origin + (baseName ? `/${baseName}/` : '/')
)}`;

export { loginHost, appCode, loginUrl };
