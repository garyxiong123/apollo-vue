<template>

  <!--<el-row class="tac">-->
  <!--<el-col :span="12">-->
  <el-menu
           default-active="1"
           class="el-menu-vertical-demo tac"
           @open="handleOpen"
           @close="handleClose" style="padding-left: 1px;">
    <!--<el-submenu index="1">-->
    <!--<template slot="title">-->
    <!--<i class="el-icon-location"></i>-->
    <!--<span>管理项目</span>-->
    <!--</template>-->
    <!--</el-submenu>-->


    <el-menu-item index="1" >
      <i class="el-icon-location"></i>
      <span slot="title" >管理项目</span>
    </el-menu-item >
    <el-menu-item index="2" >
      <i class="el-icon-menu"></i>
      <span slot="title">添加Namespace</span>
    </el-menu-item>
    <el-menu-item index="3" >
      <i class="el-icon-setting"></i>
      <span slot="title">添加集群</span>
    </el-menu-item>
  </el-menu>
  <!--</el-col>-->
  <!--</el-row>-->

</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }


</script>
<style lang="scss" scoped>
  @import "../../../common/common.scss";

  .tac {

    el-menu-item {
      padding: 0px;
    }

    .el-col-12 {
      width: 100%;
    }

    .treeview .list-group-item {
      cursor: pointer;
    }

    ul, li {
      padding: 0;
      margin: 0;
    }

    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }
  }
</style>
