/** 通用动态面包屑 **/
import { useMemo } from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './index.less';

export interface IRouteViewProps {
  path?: string;
  redirect?: string;
  component?: any;
  exact?: boolean;
  children?: IRouteViewProps[];
  location?: Location;
  breadList?: { name: string; path: string }[];
  showGoBack?: boolean;
}

/**
 * 通用面包屑
 * 根据路由通用展示，需要在router中配置breadList
 * 兼容参数生成路由，在页面手动传入breadList
 * path为空不进行跳转
 * 支持手动控制返回
 */
export const Bread = (props: IRouteViewProps) => {
  const { children = [], breadList, showGoBack, location = {} } = props;
  const { pathname = '' } = location as any;
  const navigate = useNavigate();

  // 根据当前location动态生成对应的面包屑
  const renderBreads = useMemo(() => {
    const breads: JSX.Element[] = [];
    // 直接获取breadList是动态页面手动调用，从children获取breadList是通用处理
    const currBreadList = breadList
      ? breadList
      : children.filter(i => i.path === pathname)[0]?.breadList;

    // 获取当前路由参数
    if (currBreadList) {
      currBreadList.forEach(item => {
        breads.push(
          <Breadcrumb.Item key={item.name || Math.random()}>
            {item.path ? (
              <Link to={item.path || '#'}>{item.name}</Link>
            ) : (
              item.name
            )}
          </Breadcrumb.Item>
        );
      });
    }
    return breads;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, breadList]);

  if (!renderBreads.length) {
    return null;
  }

  return (
    <div
      className={`common-bread ${
        renderBreads.length === 1 && 'common-bread-big'
      }`}
    >
      {(showGoBack != null ? showGoBack : renderBreads.length > 1) && (
        <Button
          icon={<LeftOutlined />}
          className='bread-btn'
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
      )}
      <Breadcrumb>{renderBreads}</Breadcrumb>
    </div>
  );
};
