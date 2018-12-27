<template>
  <aside class="main-nav">
    <div v-if="!menuHide" class="nav-menu">
      <el-menu @select="selectNav" router unique-opened :default-active="openKey"
              class="navbar-menu" text-color="#424e67" active-text-color="#3b8cff">
        <template v-for="menu in menus">
          <el-submenu v-if="menu.children.length" :key="menu.id" :index="menu.path">
            <template slot="title">
              <i :class="'iconfont icon-liebiao1'"></i>
              <span>{{menu.name}}</span>
            </template>
            <itemTree :children="menu.children"></itemTree>
          </el-submenu>
          <el-menu-item v-else :key="menu.name" :index="menu.path">
            <i :class="'iconfont icon-liebiao1'"></i>
            <span :title="menu.name" slot="title">{{ menu.name.length>10?(menu.name.slice(0,10)+'...'):menu.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div @click="changeMenu" :style="{left:menuHide?'0':'200px'}" class="menuBtn">
      <i v-if="menuHide" class="el-icon-arrow-right"></i>
      <i v-else class="el-icon-arrow-left"></i>
    </div>
  </aside>
</template>
<script>
import itemTree from "./itemTree";

export default {
  data() {
    return {
      menus: JSON.parse(localStorage.getItem("menu")),
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      openKey: "",
      menuHide: false
    };
  },
  components: {
    itemTree
  },
  mounted() {
    this.setDefault();
    const env = localStorage.getItem("iframeEnv");
    this.getMenu(env);
    this.menuHide = this.$route.fullPath.includes("frame");
  },
  methods: {
    async getMenu(env, needRefresh) {
      const menuRes = await this.$auth.getMenusByUserId({
        env: env || "TEST",
        appCode: "middleBackground",
        userId: this.userInfo.id
      });
      if (menuRes) {
        if (menuRes.data.length) {
          const menu = menuRes.data[0].menuVo;
          localStorage.setItem("menu", JSON.stringify(menu));
          this.menus = menu;
          const frameMap = this.getFrameMap(menu);
          localStorage.setItem("frameMap", JSON.stringify(frameMap));
          if (needRefresh) {
            location.reload();
          }
        } else {
          this.$router.push({
            path: "/noAuth"
          });
        }
      }
    },
    getFrameMap(data) {
      let frameMap = {};
      const fun = function(arr) {
        arr.forEach(item => {
          if (item.type === 3) {
            frameMap[item.path.split("/").slice(-1)[0]] = item.iframeUrl;
          }
          if (item.children && item.children.length) {
            fun(item.children);
          }
        });
      };
      fun(data);
      return frameMap;
    },
    setDefault() {
      const catalog = document.location.pathname;
      this.selectNav(catalog);
    },
    selectNav(path) {
      this.menuHide = path.includes("frame");
      this.openKey = path;
    },
    changeMenu() {
      this.menuHide = !this.menuHide;
    },
    linkTo(path) {
      this.openKey = path;
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar-menu {
  text-align: left;
}

.main-nav {
  transition: all 0.5s;
  .nav-menu {
    width: 200px;
    height: 100%;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.nav-menu::-webkit-scrollbar {
  width: 7px;
  border-radius: 2px;
}
.nav-menu::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #dddee0;
}
.nav-menu::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #fff;
}
.menuBtn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;
  width: 20px;
  height: 50px;
  background: #fff;
  border: 1px solid #eee;
  border-left: none;
  line-height: 50px;
  cursor: pointer;
}
.menuBtn:hover {
  background: #eee;
  color: #333;
}
</style>
