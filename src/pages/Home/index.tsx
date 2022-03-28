import { useAuth } from '@/context/authContext';
import './index.less';

const HomeContainer = () => {
  const { userInfo } = useAuth();
  return <div className='page-home'>hello {userInfo?.aliasName}</div>;
};
export default HomeContainer;
