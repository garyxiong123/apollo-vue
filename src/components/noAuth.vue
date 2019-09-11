<template>
  <div>
    <Top style="height:50px"></Top>
    <div class="no-auth-box">
      <i class="el-icon-warning"></i>
      <div class="text">
        <h2 style="margin:10px 0">您没有权限进入系统，请联系管理员为您添加权限</h2>
        <el-button @click="$router.push('/login')" type="warning">返回登陆页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Top from "./main/components/topUser";
export default {
  components: {
    Top
  },
  mounted() {
    // this.$notify({
    //   title: "提示",
    //   message: "您可在此处修改密码",
    //   duration: 0,
    //   offset: 30
    // });
  }
};
</script>
<style lang="scss" scoped>
.no-auth-box {
  padding: 150px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.el-icon-warning {
  color: goldenrod;
  font-size: 150px;
}
.text {
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
