/** 左侧导航 **/
import { useState, useEffect } from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { Link, Location } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { MenuFoldOutlined } from '@ant-design/icons';
import './index.less';
import { IMenuProps } from '@/types/user';
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

interface IProps {
  location: Location;
}

export default function MenuCom(props: IProps) {
  const { pathname } = props?.location;
  const { userInfo } = useAuth();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // 当前选中
  const [openKeys, setOpenKeys] = useState<string[]>([]); // 当前需要被展开的项
  const [collapsed, setCollapsed] = useState(false); // 菜单展开还是收起，自动展示

  // 当页面路由跳转时，即location发生改变，则更新选中项
  useEffect(() => {
    const openkeys = getOpenKeys(pathname);
    setOpenKeys(openkeys);
    setSelectedKeys([pathname]);
  }, [pathname]);

  // 处理 pathname ，获取 menu 展开的 keys
  const getOpenKeys = (pathname: string) => {
    let newStr = '';
    const newArr: string[] = [];
    let arr = pathname.split('/').map(i => '/' + i);
    arr = arr.slice(1, -1);
    arr.forEach((item: string) => {
      newStr += item;
      newArr.push(newStr);
    });
    return newArr;
  };

  // 菜单展开
  const onOpenChange = (keys: any) => {
    setOpenKeys(keys as string[]);
  };

  // 平级数据转tree格式，支持无限层级
  const listToTree = (list?: IMenuProps[]) => {
    if (!list) return [];
    const initParentCode = '';
    const menuMap = new Map<string, IMenuProps>();
    const menuDate: IMenuProps[] = [];

    list.forEach(item => {
      menuMap.set(item.permissionCode, { ...item, children: [] });
    });
    menuMap.forEach(item => {
      if (item.parentCode !== initParentCode && menuMap.has(item.parentCode)) {
        const prevInfo = menuMap.get(item.parentCode)!;
        prevInfo.children?.push(item as IMenuProps);
      }
    });

    menuMap.forEach(item => {
      if (!item.parentCode || item.parentCode === initParentCode) {
        menuDate.push(item);
      }
    });
    return menuDate;
  };

  // 构建树结构
  const renderMenu = (data: IMenuProps[]) => {
    return data.map((item: IMenuProps) => {
      if (item.children && item.children.length) {
        return (
          <SubMenu
            key={item.permissionCode}
            title={item.permissionName}
            icon={
              <span className='anticon'>
                <i className={`iconfont ${item.icon || 'iconhomepage'}`} />
              </span>
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Item key={item.permissionCode} title={item.permissionName}>
          <Link to={item.permissionUrl.replace('/task-pc', '')}>
            {item.icon ? (
              <span className='anticon'>
                {<i className={`iconfont ${item.icon || 'iconhomepage'}`} />}
              </span>
            ) : null}
            <span>{item.permissionName}</span>
          </Link>
        </Item>
      );
    });
  };

  return (
    <Sider
      width={264}
      breakpoint='xl'
      className='sider'
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={val => setCollapsed(val)}
      theme={'light'}
    >
      <Menu
        mode='inline'
        {...(!collapsed ? {} : { openKeys })}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
      >
        {renderMenu(listToTree(userInfo?.menuPermissions))}
      </Menu>
      <div className={collapsed ? 'menuTop trigger' : 'menuTop fold'}>
        <Tooltip placement='bottom' title={collapsed ? '展开菜单' : '收起菜单'}>
          <MenuFoldOutlined
            className={collapsed ? 'trigger fold' : 'trigger'}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Tooltip>
      </div>
    </Sider>
  );
}
