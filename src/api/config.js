import axios from "axios";
import Vue from "vue";
import ipObj from "./ip";
import qs from 'qs';


function changeIp(oip, host) {
  const httpArr = oip.split('//');
  const pathArr = httpArr[1].split('/');
  const path = pathArr.slice(1).join('/');
  return httpArr[0] + '//' + host + '/' + path;
}
axios.defaults.withCredentials=true
axios.interceptors.request.use(config => {
  //添加请求头
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token");
  }

  return config;
});
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code == 200||response.data.code == 1) {
        return response.data.data;
      } else if (!response.data.code) {
        return response;
      } else {
        Vue.prototype.$message({
          message: response.data.desc,
          type: "warning"
        });
        return false;
      }
    }
  },
  //错误处理
  error => {
    const res = JSON.parse(JSON.stringify(error)).response;
    console.error(error);
    if (res.status === 400) {
      Vue.prototype.$message({
        message: res.data.desc,
        type: "error"
      });
      console.log(res.data);
      return false;
    } else if (res.status === 401) {
      Vue.prototype.$message({
        message: res.data.desc,
        type: "error"
      });
      document.location.pathname = "/";
    } else if (res.status === 403) {
      Vue.prototype.$message({
        message: res.data.desc,
        type: "error"
      });
    } else if (res.status === 500) {
      Vue.prototype.$message({
        message: res.data.desc || res.data.error,
        type: "error"
      });
      console.log(res.data);
      return false;
    } else {
      Vue.prototype.$message({
        message: JSON.parse(JSON.stringify(error)),
        type: "error"
      });
      console.log(JSON.stringify(error));
      return false;
    }
  }
);

export default class Config extends axios {
  static getIp() {
    return ipObj.ip;
  }
  static comGet(path) {
    return new Promise((resolve, reject) => {
      const url = ipObj.ip + path;
      this.get(url).then(res => {
        resolve(res);
      });
    });
  }

  static comPostForm(path, data) {
    return new Promise((resolve, reject) => {
      const url = ipObj.ip + path;
      console.log(url)
      this.post(url, qs.stringify(data)).then(res => {
        resolve(res);
      });
    });
  }

  static comPost(path, data) {
    return new Promise((resolve, reject) => {
      const url = ipObj.ip + path;
      console.log(url)
      this.post(url, data).then(res => {
        resolve(res);
      });
    });
  }
  static comPatch(path, data) {
    return new Promise((resolve, reject) => {
      const url = ipObj.ip + path;
      this.patch(url, data).then(res => {
        resolve(res);
      });
    });
  }
  static comPut(path, data) {
    return new Promise((resolve, reject) => {
      const url = ipObj.ip + path;
      this.put(url, data).then(res => {
        resolve(res);
      });
    });
  }
  static comDel(path, data = {}) {
    return new Promise((resolve, reject) => {
      const url = ipObj.ip + path;
      this.delete(url, { data }).then(res => {
        resolve(res);
      });
    });
  }
  // static comSocket(path) {
  //   return new Promise((resolve, reject) => {
  //     if (localStorage.getItem("token")) {
  //       const url = ipObj.socketIp + path + `?token=${localStorage.getItem("token")}`;
  //       const socket = new WebSocket(url);
  //       socket.onopen = () => {
  //         resolve(socket);
  //       }
  //     }
  //   });
  // }
}
