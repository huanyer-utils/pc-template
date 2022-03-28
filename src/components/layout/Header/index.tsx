/** 头部 **/
import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { Dropdown, Menu } from 'antd';
import { SmileOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import ResetPwdModal from './ResetPwdModal';
import './index.less';

export default function HeaderCom() {
  const { userInfo, logout } = useAuth();
  const [changePwdVisible, setChangePwdVisible] = useState(false); // 是否展示修改密码弹窗

  return (
    <div className='header-component'>
      <div className='header-title'>
        <img
          src='https://img.alicdn.com/imgextra/i4/O1CN01zQfXj11PIELaejYW5_!!6000000001817-2-tps-1706-280.png'
          alt='logo'
        />
        <span className='logo-line' />
        应用名称
      </div>
      <div className='right-box'>
        <span className='org-name'>当前组织：{userInfo?.organizationName}</span>
        <Dropdown
          overlay={
            <Menu className='menu'>
              <Menu.Item
                key='resetPwd'
                className='pending'
                onClick={() => setChangePwdVisible(true)}
              >
                <span>
                  <EditOutlined />
                  修改密码
                </span>
              </Menu.Item>
              <Menu.Item key='logout' className='pending' onClick={logout}>
                <span>
                  <LogoutOutlined />
                  退出登录
                </span>
              </Menu.Item>
            </Menu>
          }
          placement='bottomRight'
        >
          <div className='userhead all_center'>
            <SmileOutlined />
            <span className='username'>{userInfo?.aliasName}</span>
          </div>
        </Dropdown>
      </div>
      {changePwdVisible && (
        <ResetPwdModal
          onCancel={() => {
            setChangePwdVisible(false);
          }}
          onOk={() => {
            setChangePwdVisible(false);
          }}
        />
      )}
    </div>
  );
}
