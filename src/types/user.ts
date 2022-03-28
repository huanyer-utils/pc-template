export interface IMenuProps {
  parentCode: string;
  permissionCode: string;
  permissionName: string;
  permissionUrl: string;
  icon: string;
  // 排序编号
  sort: number;
  [key: string]: any;
}

export interface IRoleProps {
  roleCode: string;
  roleName: string;
  [key: string]: any;
}

export interface IUserProps {
  // 用户id
  userId: number;
  // 真实姓名
  aliasName: string;
  // 手机号码
  mobileNum: string;
  // 当前部门|区域code
  organizationCode: string;
  // 当前部门|区域名称
  organizationName: string;
  // 区域1、部门2
  organizationType: string;
  // 菜单列表
  menuPermissions: IMenuProps[];
  // 角色列表
  roles: IRoleProps[];
  [key: string]: any;
}
