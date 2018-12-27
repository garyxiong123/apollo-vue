<template>
  <header class="main-header">
    <LogoTitle />
    <!--<el-radio-group @change="changeEnv" size="small" style="float:left;margin-top:8px;margin-left:10px" v-model="env">-->
        <!--&lt;!&ndash; <el-radio-button label="DEV">dev</el-radio-button> &ndash;&gt;-->
        <!--<el-radio-button label="TEST">test</el-radio-button>-->
        <!--<el-radio-button label="PRE">pre</el-radio-button>-->
        <!--<el-radio-button label="PROD">prod</el-radio-button>-->
    <!--</el-radio-group>-->
    <TopUser></TopUser>
    <searchBar></searchBar>
  </header>
</template>
<script>
import LogoTitle from "./logoTitle";
import TopUser from "./topUser";
import searchBar from "../../../common/components/searchBar";
export default {
  data() {
    return {
      env: "TEST",
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      cmdb: false,
      ticket: false,
      publish: false,
      user: false,
      navArr: [],
      nowIndex: 0
    };
  },
  components: {
    LogoTitle,
    TopUser,
    searchBar
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.env = localStorage.getItem("iframeEnv") || "TEST";
      setTimeout(() => {
        const catalog = document.location.pathname.split("/")[1];
        this.navArr.forEach((item, index) => {
          if (item.code === catalog) {
            this.nowIndex = index;
          }
        });
      }, 500);
    },
    changeEnv(val) {
      this.$store.commit("SETENV", val);
      localStorage.setItem("iframeEnv", val);
      this.$parent.$children.forEach(item => {
        if (item.menus) {
          item.getMenu(val, true);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/common.scss";
.main-header {
  position: relative;
  height: 50px;
  background-color: #fff;

}
</style>
