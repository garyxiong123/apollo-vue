import config from "./config";

const publicPath = "auth";

export default class Ticket extends config {
  //登录相关
  //登录
  // http://10.0.40.14:55303/signin
  static login(data) {
    const path = `/signin`;
    return this.comPost(path, data);
  }

  //登出
  static logout() {
    const path = `/logout`;
    return this.comGet(path);
  }

  static getMenusByUserId(data) {
    const path = `/${publicPath}/getMenusByUserId`;
    return this.comPost(path, data)
  }

  static getAllApps() {
    const path = `/apps?appIds=`;
    return this.comGet(path)
  }

  static getUserInfo() {
    const path = `/user`;
    return this.comGet(path)
  }


  static getAllEnv(appName) {
    const path = `/apps/${appName}/navtree`;
    return this.comGet(path)
  }


  static getNamespaceByApplicationAndEnv(appId, env, cluster) {
    const path = `/apps/${appId}/envs/${env}/clusters/${cluster}/namespaces`;
    return this.comGet(path)
  }

  static getChangeHistoryByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName) {

    // apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/application/commits?page=0&size=10
    const path = `/apps/${appId}/envs/${env}/clusters/${clusterName}/namespaces/${namespaceName}/commits?page=0&size=10`;
    return this.comGet(path)
  }



  static getNamespacePublishedTextByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName) {
    // http://localhost:9999/apps/platform-sample-provider/envs/DEV/clusters/default/namespaces/TEST1.monitor22/releases/active?page=0&size=1

    const path = `/apps/{{appId}}/envs/{{env}}/clusters/{{clusterName}}/namespaces/{{namespaceName}}/releases/active?page=0&size=10`;
    return this.comGet(path)
  }

}
