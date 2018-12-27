<template>
  <article class="main-box">
    <TopNav ref="topbar"></TopNav>
    <section class="main-body">
      <NavBar ref="navbar" ></NavBar>
      <section class="main-content">
          <router-view></router-view>
      </section>
    </section>
  </article>
</template>
<script>
import NavBar from "./components/navbar";
import TopNav from "./components/topNav";

export default {
  data() {
    return {
      formLabelWidth: "80px"
    };
  },
  components: {
    NavBar,
    TopNav
  },
  mounted() {
    window.addEventListener("popstate", () => {
      this.$refs['topbar'].init();
      this.$refs['navbar'].linkTo(this.$route.fullPath);
    });
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/common.scss";
.main-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 1000px;
  background-color: #fff;
  .main-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    .main-content {
      flex: 1;
      width: 100%;
      overflow: auto;
      position: relative;
      text-align: left;
    }
  }
}
</style>
