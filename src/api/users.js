import config from "./config";

const publicPath = "upms";

export default class USER extends config {
  //用户管理
  static getUsersByPage(data) {
    const path = `/${publicPath}/user/search`;
    return this.comPost(path, data);
  }
  static addUser(data) {
    const path = `/${publicPath}/user/save`;
    return this.comPost(path, data);
  }
  static updateUser(data) {
    const path = `/${publicPath}/user/update`;
    return this.comPut(path, data);
  }
  static deleteUser(id) {
    const path = `/${publicPath}/user/delete/${id}`;
    return this.comDel(path);
  }
  //查询用户可以管理部门
  static getCurrUserManageDepts() {
    const path = `/${publicPath}/user/getCurrUserManageDepts`;
    return this.comGet(path);
  }
  //查询用户可以管理角色
  static getCurrUserManageRoles() {
    const path = `/${publicPath}/user/getCurrUserManageRoles`;
    return this.comGet(path);
  }

  //角色列表
  //根据id查询角色
  static getRoleById(id) {
    const path = `/${publicPath}/role/${id}`;
    return this.comGet(path);
  }
  //获取角色
  static getRole(param = "") {
    const path = `/${publicPath}/role/search${param}`;
    return this.comGet(path);
  }
  //分页获取角色
  static getRoleById(id) {
    const path = `/${publicPath}/role/${id}`;
    return this.comGet(path);
  }
  //新增角色
  static addRole(data) {
    const path = `/${publicPath}/role`;
    return this.comPost(path, data);
  }
  //新增之前查询角色可分配后台和权限
  static getRoleAssignInfo() {
    const path = `/${publicPath}/role/assignableInfo`;
    return this.comGet(path);
  }
  //更新角色
  static updateRole(data) {
    const path = `/${publicPath}/role`;
    return this.comPut(path, data);
  }
  static delRole(id) {
    const path = `/${publicPath}/role/${id}`;
    return this.comDel(path);
  }
  static getBgRoles() {
    const path = `/${publicPath}/role/forCreatingBackground`;
    return this.comGet(path);
  }
  static getAuthRoles() {
    const path = `/${publicPath}/role/forCreatingPermission`;
    return this.comGet(path);
  }
  static addBack(data) {
    const path = `/${publicPath}/background`;
    return this.comPost(path, data);
  }
  static updateBack(data) {
    const path = `/${publicPath}/background`;
    return this.comPut(path, data);
  }
  static delBack(id) {
    const path = `/${publicPath}/background/${id}`;
    return this.comDel(path);
  }
  static getBack(param = "") {
    const path = `/${publicPath}/background/search${param}`;
    return this.comGet(path);
  }
  static getAllBack() {
    const path = `/${publicPath}/background/searchAll`;
    return this.comGet(path);
  }
  static delOrg(id) {
    const path = `/${publicPath}/org/delete/${id}`;
    return this.comDel(path);
  }
  static getAllOrg() {
    const path = `/${publicPath}/org/getAllCom`;
    return this.comGet(path);
  }
  static addOrg(data) {
    const path = `/${publicPath}/org/save`;
    return this.comPost(path, data);
  }
  static getOrgByOrg(param) {
    const path = `/${publicPath}/org/search${param}`;
    return this.comGet(path);
  }
  static updateOrg(data) {
    const path = `/${publicPath}/org/update`;
    return this.comPut(path, data);
  }
  //菜单管理
  static getAllMenu(param, data) {
    const path = `/${publicPath}/permission/getAll${param}`;
    return this.comPost(path, data);
  }
  static addMenu(data) {
    const path = `/${publicPath}/permission/add`;
    return this.comPost(path, data);
  }
  static delMenu(id) {
    const path = `/${publicPath}/permission/delete/${id}`;
    return this.comDel(path);
  }
  static updateMenu(data) {
    const path = `/${publicPath}/permission/update`;
    return this.comPut(path, data);
  }
  //根据后台id获取所有菜单不包括按钮
  static getMenus(id) {
    const path = `/${publicPath}/permission/getMenu/${id}`;
    return this.comGet(path);
  }
  static downloadMock() {
    const path = `${this.getIp()}/${publicPath}/permission/download?token=${localStorage.getItem(
      "token"
    )}`;
    window.open(path);
    // return this.comGet(path);
    // window.open(`${this.getIp()}/${publicPath}/permission/upload`);
  }
  static uploadMenu(data) {
    const path = `/${publicPath}/permission/upload`;
    return this.comPost(path, data);
  }
  static getDepByComId(id) {
    const path = `/${publicPath}/org/getAllDeptByComId?comId=${id}`;
    return this.comGet(path);
  }

  static modPassword(data) {
    const path = `/${publicPath}/user/password/update`;
    return this.comPut(path, data);
  }
}
