import '@/micro/publicPath';
import ReactDOM from 'react-dom';
import { AppRouter } from '@/router';
import { UseRequestProvider } from 'ahooks';
import axios from '@/utils/request';
import { AuthProvider } from '@/context/authContext';
// 全局样式
import '@/assets/styles/index.less';
// antd 除日期外其他组件中文格式化
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
// antd日期组件格式化为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import actions from './micro/actions';


dayjs.locale('zh-cn');

const reactRender = (
  <ConfigProvider locale={zhCN}>
    <UseRequestProvider
      value={{
        requestMethod: param => axios(param),
        manual: true,
      }}
    >
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </UseRequestProvider>
  </ConfigProvider>
);

// process.env.REACT_APP_RUNTYPE 标识当前是否为微前端环境
if (process.env.REACT_APP_RUNTYPE !== 'micro') {
  ReactDOM.render(reactRender, document.getElementById('root'));
}

export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props: any) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  ReactDOM.render(
    reactRender,
    props.container
      ? props.container.querySelector('#root')
      : document.getElementById('root')
  );
}

export async function unmount(props: any) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector('#root')
      : document.getElementById('root')
  );
}

export async function update(props: any) {
  console.log('update props', props);
}
