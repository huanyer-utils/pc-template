import React from 'react';
import './index.less';
interface IProps {
  content?: string;
  type?: string; // error 401
}
const NoPower: React.FC<IProps> = ({ content, type = '401' }) => {
  return (
    <div className='page-noPower'>
      <div>
        <img
          src={
            type === 'error'
              ? 'https://img.alicdn.com/imgextra/i2/O1CN01CyyjLK1sxYwxLkPSy_!!6000000005833-2-tps-480-480.png'
              : 'https://gw.alicdn.com/tfs/TB1cIRM4Lb2gK0jSZK9XXaEgFXa-200-200.png'
          }
          alt={type}
        />
        <div className='text'>{content || '请联系管理员开通权限'}</div>
      </div>
    </div>
  );
};

export default NoPower;
