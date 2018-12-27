import config from "./config";

export default class Base extends config {
  static getMailList(data) {
    const path = '/communication/mail/list';
    return this.comPost(path, data);
  }
  //版本管理
  static getAllPackageVersion(data = {}) {
    const path = `/basic/package_version/getAllPackageVersion`;
    return this.comPost(path, data);
  }
  static getAllPackageType(data = {}) {
    const path = `/basic/package_version/getAllPackageType`;
    return this.comPost(path, data);
  }
  static getAllDeviceType(data = {}) {
    const path = `/basic/package_version/getAllDeviceType`;
    return this.comPost(path, data);
  }
  static getPackageVersionList(data) {
    const path = `/basic/package_version/search`;
    return this.comPost(path, data);
  }
  static savePackageVersion(data) {
    const path = `/basic/package_version/save`;
    return this.comPost(path, data);
  }
  static startPackageVersion(id) {
    const path = `/basic/package_version/startUsing?id=${id}`;
    return this.comPut(path, {})
  }
  static stopPackageVersion(id) {
    const path = `/basic/package_version/stopUsing?id=${id}`;
    return this.comPut(path, {})
  }
  static delPackageVersion(id) {
    const path = `/basic/package_version/delete?id=${id}`;
    return this.comDel(path);
  }
  static updatePackageVersion(data) {
    const path = `/basic/package_version/update`;
    return this.comPost(path, data);
  }
  static getAllPackageInfo(data = {}) {
    const path = `/basic/package_version/getAllPackageInfo`;
    return this.comPost(path, data)
  }
  //渠道管理
  static delChannel(id) {
    const path = `/basic/package_version_channel/delete?id=${id}`;
    return this.comDel(path);
  }
  static getAllChannel() {
    const path = `/basic/package_version_channel/getAllChannel`;
    return this.comGet(path)
  }
  static getAllTab() {
    const path = `/basic/package_version_channel/getAllTab`;
    return this.comGet(path)
  }
  static savePackageVersionChannel(data) {
    const path = `/basic/package_version_channel/save`;
    return this.comPost(path, data);
  }
  static getPackageChannelList(data) {
    const path = `/basic/package_version_channel/search`;
    return this.comPost(path, data);
  }
  static startPackageChannel(id) {
    const path = `/basic/package_version_channel/startUsing?id=${id}`;
    return this.comPut(path, {})
  }
  static stopPackageChannel(id) {
    const path = `/basic/package_version_channel/stopUsing?id=${id}`;
    return this.comPut(path, {})
  }
  static updatePackageChannel(data) {
    const path = `/basic/package_version_channel/update`;
    return this.comPost(path, data);
  }
  //推荐位管理
  static getPositionContentsByPositionId(data) {
    const path = `/basic/recommend_position/contents`;
    return this.comPost(path, data)
  }
  static delRecommendPositionById(id) {
    const path = `/basic/recommend_position/delete?id=${id}`;
    return this.comDel(path);
  }
  static getPositionStatus() {
    const path = `/basic/recommend_position/getPositionStatus`;
    return this.comPost(path, {});
  }
  static getRecommendPositionList(data) {
    const path = `/basic/recommend_position/pageData`;
    return this.comPost(path, data)
  }
  static saveRecommendPosition(data) {
    const path = `/basic/recommend_position/save`;
    return this.comPost(path, data);
  }
  static updateRecommendPosition(data) {
    const path = `/basic/recommend_position/update`;
    return this.comPut(path, data);
  }
  static startRecommendPositin(id) {
    const path = `/basic/recommend_position/startUsing?id=${id}`;
    return this.comPut(path, {})
  }
  static stopRecommendPosition(id) {
    const path = `/basic/recommend_position/stopUsing?id=${id}`;
    return this.comPut(path, {})
  }
  static getAllLinkType() {
    const path = `/basic/recommend_position/getAllLinkType`;
    return this.comGet(path);
  }
  //推荐位内容管理
  static savePositionContent(data) {
    const path = `/basic/positionContent/save`;
    return this.comPost(path, data);
  }
  static startPositionContent(id) {
    const path = `/basic/positionContent/startUsing?id=${id}`;
    return this.comPut(path);
  }
  static stopPositionContent(id) {
    const path = `/basic/positionContent/stopUsing?id=${id}`;
    return this.comPut(path);
  }
  static updatePositionContent(data) {
    const path = `/basic/positionContent/update`;
    return this.comPut(path, data);
  }
  static delPositionContent(id) {
    const path = `/basic/positionContent/${id}`;
    return this.comDel(path)
  }
  //特殊推荐位管理
  static getSpeRecPositionById(id) {
    const path = `/basic/specialRecommendPosition/${id}`;
    return this.comGet(path);
  }
  static delSpeRecPosition(id) {
    const path = `/basic/specialRecommendPosition/${id}`;
    return this.comDel(path);
  }
  static getSpeRecPositionList(data) {
    const path = `/basic/specialRecommendPosition/pageData`;
    return this.comPost(path, data);
  }
  static saveSpeRecPosition(data) {
    const path = `/basic/specialRecommendPosition/save`;
    return this.comPost(path, data);
  }
  static startSpeRecPosition(id) {
    const path = `/basic/specialRecommendPosition/startUsing?id=${id}`;
    return this.comPut(path);
  }
  static stopSpeRecPosition(id) {
    const path = `/basic/specialRecommendPosition/stopUsing?id=${id}`;
    return this.comPut(path);
  }
  static updateSpeRecPosition(data) {
    const path = `/basic/specialRecommendPosition/update`;
    return this.comPut(path, data);
  }
  //模板图标管理
  static getTemIconById(id) {
    const path = `/basic/templateIcon/${id}`;
    return this.comGet(path);
  }
  static delTemIcon(id) {
    const path = `/basic/templateIcon/${id}`;
    return this.comDel(path);
  }
  static getALLTemIcon() {
    const path = `/basic/templateIcon/findAll`;
    return this.comGet(path);
  }
  static getTemIconList(data) {
    const path = `/basic/templateIcon/pageData`;
    return this.comPost(path, data)
  }
  static saveTemIcon(data) {
    const path = `/basic/templateIcon/save`;
    return this.comPost(path, data)
  }
  static startTemIcon(id) {
    const path = `/basic/templateIcon/startUsing?id=${id}`;
    return this.comPut(path);
  }
  static stopTemIcon(id) {
    const path = `/basic/templateIcon/stopUsing?id=${id}`;
    return this.comPut(path);
  }
  static updateTemIcon(data) {
    const path = `/basic/templateIcon/update`;
    return this.comPut(path, data);
  }

  //敏感词
  static addKeyList(data) {
    const path = `/business/admin/addKeyList`;
    return this.comPost(path, data);
  }
  static addKeyListByTxt(data, code) {
    const path = `/business/admin/addKeyListByTxt?businessCode=${code}`;
    return this.comPost(path, data)
  }
  static delKeyList(data) {
    const path = `/business/admin/delKeyList`;
    return this.comPost(path, data)
  }
  static queryBusinessList() {
    const path = `/business/admin/queryBusinessList`;
    return this.comGet(path);
  }
  static queryKeyList(data) {
    const path = `/business/admin/queryKeyList`;
    return this.comPost(path, data);
  }
  //文件存储
  static queryFileUploadList(data, page, size) {
    const path = `/storage/api/list?page=${page}&size=${size}`;
    return this.comPost(path, data);
  }
  static fileSaveUpload(storageServer, data) {
    const path = `/storage/api/upload/${storageServer}`;
    return this.comPost(path, data);
  }
  //地区管理
  static getAreaDtos(code) {
    const path = `/basic/area/getAreaDtos?parentCode=${code}`;
    return this.comPost(path, {});
  }
  static getAreaTree() {
    const path = `/basic/area/getAreaTree`;
    return this.comGet(path);
  }
  static getCountryCode() {
    const path = `/basic/area/getCountryCode`;
    return this.comGet(path);
  }
  //abtest
  //用户产品
  static delUserProduct(data) {
    const path = `/policy/userProduct/delete`;
    return this.comPost(path, data);
  }
  static getUserProduct() {
    const path = `/policy/userProduct`;
    return this.comGet(path);
  }
  static editUserProduct(data) {
    const path = `/policy/userProduct/edit`;
    return this.comPost(path, data);
  }
  //实验
  static getAllExperiment() {
    const path = `/policy/experiment`;
    return this.comGet(path);
  }
  static addExperiment(data) {
    const path = `/policy/experiment`;
    return this.comPost(path, data);
  }
  static endExperiment(id) {
    const path = `/policy/experiment/close/${id}`;
    return this.comPost(path, {})
  }
  static editExperiment(data) {
    const path = `/policy/experiment/edit`;
    return this.comPost(path, data);
  }
  //策略
  static importDeviceOrUser(data) {
    const path = `/policy/deviceOrUser/import`;
    return this.comPost(path, data);
  }
  static addStrategy(data) {
    const path = `/policy/strategy`;
    return this.comPost(path, data);
  }
  static endStrategy(id) {
    const path = `/policy/strategy/close/${id}`;
    return this.comPost(path, {});
  }
  static manageStrategy(data) {
    const path = `/policy/strategy/manager`;
    return this.comPost(path, data);
  }
  static openStrategy(id) {
    const path = `/policy/strategy/open/${id}`;
    return this.comPost(path, {});
  }
  static delStrategy(id) {
    const path = `/policy/strategy/${id}`;
    return this.comDel(path);
  }
  static editStrategy(id, data) {
    const path = `/policy/strategy/${id}`;
    return this.comPost(path, data);
  }
  //所有产品
  static abtestGetAllProduct() {
    const path = `/policy/product`;
    return this.comGet(path);
  }
}
