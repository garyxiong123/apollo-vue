import config from "./config";
import qs from 'qs';

const publicPath = "auth";

export default class Ticket extends config {
  //登录相关
  //登录
  // http://10.0.40.14:55303/signin
  // username: apollo
  // password: admin
  // login-submit: 登录

  // http://10.0.40.14:55303/signin
  static formLogin(data) {
    const path = `/user/login`;
    return this.comPost(path, data);
  }

  static getCommonPrefix(baseInfo) {
    let {appId, env, namespaceName, clusterName} = baseInfo;
    const pathPrefix = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}`;
    return pathPrefix;
  }

  //登出
  static logout() {
    const path = `/user/logout`;

    return this.comPost(path, null);
  }

  static getMenusByUserId(data) {
    const path = `/${publicPath}/getMenusByUserId`;
    return this.comPost(path, data)
  }

  static getAllApps() {
    const path = `/apps/getApps?appIds=`;
    return this.comGet(path)
  }

  static getUserInfo() {
    const path = `/user`;
    return this.comGet(path)
  }


  static getAllEnv(appId) {
    const path = `/apps/${appId}/navtree`;
    return this.comGet(path)
  }

  static geAppByAppId(appId) {
    const path = `/apps/${appId}`;
    return this.comGet(path)
  }

  static getNamespaceByApplicationAndEnv(appId, env, cluster) {
    const path = `/apps/${appId}/envs/${env}/clusters/${cluster}/namespaces`;
    return this.comGet(path)
  }

  static getChangeHistoryByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName) {

    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/commits?page=0&size=10`;
    return this.comGet(path)
  }

  static getChangeHistoryByNameapaceIdInPage(namespaceId) {

    const path = `/namespaceId/${namespaceId}/commits?page=0&size=10`;
    return this.comGet(path)
  }


  static getNamespacePublishedTextByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName) {
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/TEST1.monitor22/releases/active?page=0&size=1

    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/releases/active?page=0&size=1`;
    return this.comGet(path)
  }


  static updateItem(namespaceInfo, data) {
    const path = this.getCommonPrefix(namespaceInfo.baseInfo) + `/item`;
    return this.comPut(path, data)
  }

  static updateItems(namespaceInfo, data) {
    const path = this.getCommonPrefix(namespaceInfo.baseInfo) + `/items`;
    return this.comPut(path, data)
  }

  static deleteItemById(namespaceInfo, itemId) {
    let {appId, env, namespaceName, clusterName} = namespaceInfo.baseInfo;
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/items/32

    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/items/${itemId}`;
    return this.comDel(path)
  }


  static releaseNamespace(namespaceInfo, itemId) {
    let {appId, env, namespaceName, clusterName} = namespaceInfo.baseInfo;
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/items/32

    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/items/${itemId}`;
    return this.comDel(path)
  }

  // http://localhost:9999/apps/platform-sample-provider/envs/TEST/clusters/default/namespaces/application/releases


  static getPublishHistoryByAppIdAndEnvAndClusterAndNamespaceInPage(appBaseInfo) {
    let {appId, env, clusterName, namespaceName} = appBaseInfo;
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/releases/histories?page=0&size=10
    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/releases/histories?page=0&size=10`;
    return this.comGet(path)
  }

  static getConfigChangeDetailByEnv(env, baseReleaseId, toCompareReleaseId) {


    // let {appId, env, clusterName, namespaceName} = appBaseInfo;
    // http://localhost:9999/envs/DEV/releases/compare?baseReleaseId=10&toCompareReleaseId=11
    // let baseReleaseId = 10;
    // let toCompareReleaseId = 11;
    const path = `/envs/${env}/releases/compare?baseReleaseId=${baseReleaseId}&toCompareReleaseId=${toCompareReleaseId}`;
    return this.comGet(path)
  }


  static commitRelease(appBaseInfo, release) {
    let {appId, env, clusterName, namespaceName} = appBaseInfo;
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/releases
    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/releases`;
    return this.comPost(path, release);
  }


  static getRecentTwoReleases(appBaseInfo) {
    let {appId, env, clusterName, namespaceName} = appBaseInfo;
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/releases/active?page=0&size=2
    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/releases/active?page=0&size=2`;
    return this.comGet(path);
  }

  // http://localhost:9999/envs/DEV/releases/compare?baseReleaseId=20&toCompareReleaseId=19

  static compareRecentTwoReleases(appBaseInfo, baseReleaseId, toCompareReleaseId) {
    let {appId, env, clusterName, namespaceName} = appBaseInfo;
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/releases/active?page=0&size=2
    const path = `/envs/${env}/releases/compare?baseReleaseId=${baseReleaseId}&toCompareReleaseId=${toCompareReleaseId}`;
    return this.comGet(path);
  }


  // http://localhost:9999/envs/DEV/releases/9/rollback


  static rollbackByreleasesId(baseInfo, releaseId) {
    let {appId, env, clusterName, namespaceName} = baseInfo;
    const path = `/envs/${env}/releases/${releaseId}/rollback`;
    return this.comGet(path);
  }


  static getContext() {

    return JSON.parse(localStorage.getItem('contextObj'));
  }


  static setContext = (obj) => {
    localStorage.setItem('contextObj', JSON.stringify(obj))
  }


}
