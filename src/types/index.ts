// 菜单对象
export interface IMenuProps {
  permissionUrl: string; // 链接路径
  permissionName: string; // 标题
  children?: IMenuProps[]; // 子菜单
  icon?: string; // 图标
  sort: number; // 排序编号
  [propName: string]: any;
}

// 分页通用type
export interface PageProps {
  pageNum: number;
  pageSize: number;
  [name: string]: any;
}

//后端指标单位通用接口
export interface IValueUnitProps {
  createTime: string;
  id: number;
  updateTime: string;
  valueType: string;
  valueUnit: string;
}

//操作按钮权限
export interface IBtnPowerProps {
  code: string; //必须与后端返回一致
  visible: boolean;
  name: string; //页面上使用的
}
