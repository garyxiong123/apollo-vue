// import config from "./config";
//
// const publicPath = "cmdb";
//
// export default class CMDB extends config {
//   //首页
//   //获取资源统计数据
//   static getAssetStatistic() {
//     const path = `/${publicPath}/home/getAssetStatistic`;
//     return this.comGet(path);
//   }
//   //合同相关统计
//   static getContractStatistic() {
//     const path = `/${publicPath}/home/getContractStatistic`;
//     return this.comGet(path);
//   }
//   static getUserNumber() {
//     const path = `/${publicPath}/home/queryCount`;
//     return this.comPost(path, {});
//   }
//   static getAllPro() {
//     const path = `/${publicPath}/home/getAll`;
//     return this.comGet(path);
//   }
//   static getStatisticByPro(id) {
//     const path = `/${publicPath}/home/getProjectAssetByMonth/${id}`;
//     return this.comGet(path);
//   }
//   //资产管理
//   //通过Id查询物理机信息
//   static getServerById(id) {
//     const path = `/${publicPath}/asset/server/get/${id}`;
//     return this.comGet(path);
//   }
//   //通过id查询虚拟机信息
//   static getVmById(id) {
//     const path = `/${publicPath}/asset/vm/get/${id}`;
//     return this.comGet(path);
//   }
//   //通过条件查询物理机及虚拟机
//   static getSeverByParams(param) {
//     const path = `/${publicPath}/asset/server/getServerAndVm${param}`;
//     return this.comGet(path);
//   }
//   //新增物理机
//   static addServer(data) {
//     const path = `/${publicPath}/asset/server/save`;
//     return this.comPost(path, data);
//   }
//   //更新物理机
//   static updateServer(data) {
//     const path = `/${publicPath}/asset/server/update`;
//     return this.comPatch(path, data);
//   }
//   //删除物理机
//   static deleteServer(id) {
//     const path = `/${publicPath}/asset/server/delete/${id}`;
//     return this.comDel(path);
//   }
//
//   //机房管理
//   //删除机房
//   static deleteLab(id) {
//     const path = `/${publicPath}/lab/delete/${id}`;
//     return this.comDel(path);
//   }
//   //根据id查询机房信息
//   // static getLabById(id) {
//   //   const url = this.url + `/${publicPath}/lab/get/${id}`;
//   //   return this.get(url);
//   // }
//   //获取所有机房
//   static getAllLab() {
//     const path = `/${publicPath}/lab/getAll`;
//     return this.comGet(path);
//   }
//   //分页查询所有机房
//   static getAllByPage(param) {
//     const path = `/${publicPath}/lab/getAllByPage${param}`;
//     return this.comGet(path);
//   }
//   //新增机房
//   static addLab(data) {
//     const path = `/${publicPath}/lab/save`;
//     return this.comPost(path, data);
//   }
//   //更新机房
//   static updateLab(data) {
//     const path = `/${publicPath}/lab/update`;
//     return this.comPatch(path, data);
//   }
//
//   //机柜管理
//   //删除机柜
//   static deleteCab(id) {
//     const path = `/${publicPath}/cabinet/delete/${id}`;
//     return this.comDel(path);
//   }
//   //根据id查找机柜
//   // static getCabById(id) {
//   //   const url = this.url + `/${publicPath}/cabinet/get/${id}`;
//   //   return this.get(url);
//   // }
//   //获取所有机柜信息
//   static getAllCab() {
//     const path = `/${publicPath}/cabinet/getAll`;
//     return this.comGet(path);
//   }
//   //根据机房id查机柜
//   static getCabByLabId(id) {
//     const path = `/${publicPath}/cabinet/getCabinetByLabId/${id}`;
//     return this.comGet(path);
//   }
//   //增加机柜
//   static addCab(data) {
//     const path = `/${publicPath}/cabinet/save`;
//     return this.comPost(path, data);
//   }
//   //编辑机柜信息
//   static updateCab(data) {
//     const path = `/${publicPath}/cabinet/update`;
//     return this.comPatch(path, data);
//   }
//
//   //合同主体
//   //获取企业主体
//   static getSubject() {
//     const path = `/${publicPath}/contract/subject/getAll`;
//     return this.comGet(path);
//   }
//   //添加企业主体
//   static addSubject(data) {
//     const path = `/${publicPath}/contract/subject/add`;
//     return this.comPost(path, data);
//   }
//   //更新企业主体
//   static updateSubject(data) {
//     const path = `/${publicPath}/contract/subject/update`;
//     return this.comPatch(path, data);
//   }
//   //删除企业主体
//   static deleteUpdate(id) {
//     const path = `/${publicPath}/contract/subject/delete/${id}`;
//     return this.comDel(path);
//   }
//
//   //合同列表
//   //添加合同
//   static addContract(data, type) {
//     const path = `/${publicPath}/contract/add/${type}`;
//     return this.comPost(path, data);
//   }
//   //删除合同
//   static deleteContract(id, type) {
//     const path = `/${publicPath}/contract/delete/${type}/${id}`;
//     return this.comDel(path);
//   }
//   //查询合同
//   static getContract(param, type) {
//     const path = `/${publicPath}/contract/getAllByPage/${type}${param}`;
//     return this.comGet(path);
//   }
//   //根据id查询合同
//   static getContractById(id, type) {
//     const path = `/${publicPath}/contract/get/${type}/${id}`;
//     return this.comGet(path);
//   }
//   //更新合同
//   static updateContract(data, type) {
//     const path = `/${publicPath}/contract/update/${type}`;
//     return this.comPost(path, data);
//   }
//   //根据类型查询合同
//   static getAllContract(type, assetType) {
//     const path = `/${publicPath}/contract/getAll/${type}/${assetType}`;
//     return this.comGet(path);
//   }
//   static jumpToPDF(id, name, type) {
//     const path =
//       this.getIp() +
//       `/${publicPath}/pdf/web/viewer.html?file=/${publicPath}/contract/displayPDF/${type}?id%3D${id}&name%3D${name}&token=${localStorage.getItem(
//         "token"
//       )}`;
//     window.open(path);
//   }
// }
