<template>
    <div class="nav-logo-box" >
        <img class="nav-logo" :src="require('../../../assets/logo-no-text.png')" alt="logo" />
        <span class="nav-title" @click="()=>this.$router.push('/applications')">有鱼apollo</span>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.nav-logo-box {
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
  .nav-title {
    transition: all 1s;
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
    color: #000;
    cursor:pointer;
  }
  .nav-logo {
    width: 38px;
    vertical-align: middle;
  }
}
</style>
