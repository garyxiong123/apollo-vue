import Vue from "vue";
import Router from "vue-router";
import upms from './components/upms'
import frame from './components/frame'
import ad from './components/ad'
import packages from './components/package'
import base from './components/base'
import monitor from './components/monitor';

const login = () => import("#/login");
const main = () => import("#/main/index");
const noAuth = () => import("@/components/noAuth");
const applications = () => import("#/applications");
const applicationInfo = () => import("#/applicationInfo");
const publishHistory = () => import("#/publishHistory/index");
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "applications",
      component: applications
    }, {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/noAuth",
      name: "noAuth",
      component: noAuth
    },
    {
      path: "/applications",
      name: "applications",
      component: applications
    },
    {
      path: "/publishHistory/:appId",
      name: "publishHistory",
      component: publishHistory
    },
    {
      path: "/applicationInfo/:appId/:env",
      name: "applicationInfo",
      component: applicationInfo
    }, {
      path: "/applicationInfo/:appId",
      name: "applicationInfo",
      component: applicationInfo
    },
    {
      path: "/main",
      component: main,
      name: "mainMenu",
      children: [
        ...upms,
        frame,
        ...ad,
        ...packages,
        ...base,
        ...monitor
      ]
    }
  ]
});
