<template>
  <div class="oper-box">
    <div>
      <div class="oper">
        <slot name="oper"></slot>
      </div>
      <div class="search">
        <slot name="search"></slot>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="nav">
      <crumbNav :navData="navs" />
    </div>
  </div>
</template>
<script>
import crumbNav from "../global/crumbNav";
export default {
  props: {
    navs: Array
  },
  components: {
    crumbNav
  }
};
</script>
<style lang="scss" scoped>
.oper-box {
  padding-top: 10px;
  .oper {
    float: left;
    line-height: 55px;
  }
  .search {
    float: right;
    line-height: 55px;
  }
  .nav {
    margin-top: 5px;
  }
}
</style>
