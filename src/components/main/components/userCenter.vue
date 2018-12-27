<template>
  <div class="main-user">
    <div class="user-name">
      欢迎您！{{userInfo.realName}}
      <i class="bottom-arrow"></i>
    </div>
    <img class="user-logo" src="../../../assets/user-logo.png" alt="user-logo">
    <div class="user-panel">
      <i class="top-arrow"></i>
      <ul>
        <div class="userInfo-head">
          <img class="user-logo-d" src="../../../assets/user-logo.png" alt="user-logo">
        </div>
        <li>
          <span class="userInfo-title">id：</span>{{userInfo.id}}</li>
        <li>
          <span class="userInfo-title">用户名：</span>{{userInfo.username}}</li>
        <li>
          <span class="userInfo-title">真实姓名：</span>{{userInfo.realName}}</li>
        <li>
          <span class="userInfo-title">邮箱：</span>{{userInfo.email}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userInfo: Object
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../../common/common.scss";
.main-user {
  float: right;
  height: 50px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
  .user-logo {
    margin-top: 5px;
    width: 40px;
    height: 40px;
    float: left;
    border-radius: 50%;
  }
  .user-logo-d {
    margin-top: 5px;
    margin-left: 10px;
    width: 50px;
    height: 50px;
    float: left;
    border-radius: 50%;
  }
  .user-name {
    float: left;
    line-height: 50px;
    margin-right: 15px;
  }
  .user-name-d {
    float: left;
    margin-left: 60px;
    line-height: 60px;
    color: #fff;
  }
  .bottom-arrow {
    position: relative;
    top: 6px;
    right: 0px;
    transition: all 0.3s;
    transform-origin: center 20%;
    @include bottom-full-arrow(#333, 6px);
  }
  .user-divid {
    font-size: 24px;
    line-height: 50px;
    margin: 0 15px;
  }
  .user-panel {
    display: none;
    position: absolute;
    z-index: 2001;
    width: 320px;
    top: 35px;
    right: -22px;
    border: 1px solid #ebeef5;
    border-top: none;
    .top-arrow {
      position: absolute;
      top: 0;
      right: 30px;
      @include top-full-arrow(#3e81e0);
    }
    ul {
      margin-top: 25px;
      padding-bottom: 10px;
      background-color: #fff;
    }
    li {
      text-align: left;
      padding: 10px 20px;
      &:hover {
        background: #f0f8fd;
      }
    }
    .userInfo-head {
      height: 60px;
      background: linear-gradient(to right, #4287e5 0%, #3e84e7 100%);
    }
    .userInfo-title {
      display: inline-block;
      text-align: right;
      width: 80px;
    }
    .logout {
      background: #f56c6c;
      color: #fff;
      padding: 10px 20px;
      text-align: center;
      cursor: pointer;
    }
  }
  &:hover .user-panel {
    display: block;
  }
  &:hover .bottom-arrow {
    transform: rotate(180deg);
  }
}
</style>
