<template>
    <div class="head-bar">
        <el-breadcrumb class="crumb" separator="/">
            <el-breadcrumb-item v-if="item !== '返回上级'" v-for="item in navData" :key="item">{{item}}</el-breadcrumb-item>
            <div style="float:left;margin-right:15px;" v-else>
                <el-button style="padding:0" type="text" @click="goBack">返回上级</el-button>
            </div>
        </el-breadcrumb>
        <slot class="oper"></slot>
    </div>
</template>
<script>
export default {
  props: {
    navData: Array
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
