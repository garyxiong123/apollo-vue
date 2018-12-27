import {typeError} from './errors'

/**
 *
 * @param {object} obj 待转数据
 * @return {FormData}
 */
export const ObjToFormData = (obj) => {
  if (!obj instanceof Object) {
    typeError('Object');
  }
  const formData = new FormData();
  const keys = Object.keys(obj);
  keys.forEach(item => {
    formData.append(item, obj[item])
  })
  return formData
}


export const getBaseParam = (obj) => {
  let {applicationName, env, cluster, namespaces} = this.$route.params;
  if (!env) {
    env = "DEV";
  }
  if (!cluster) {
    cluster = "default";
  }
  if (!namespaces) {
    namespaces = "applicaion";
  }
  let formData = {
    "env": env,
    "cluster": cluster,
    "namespaces": namespaces,
    "applicationName": applicationName
  }
  return formData
}
