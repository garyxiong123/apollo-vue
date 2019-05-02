<template>
  <article class="login-box">
    <header class="login-head">
      <img class="logo" src="../assets/logo-no-text.png" alt="logo">
      <span class="logo-name">| yy-apollo-vue</span>
    </header>
    <section class="login-body">
      <div class="desc-box">
        <h1 v-if="ipNum!==7" @click="clickIp" class="desc-line1">有鱼apollo管理系统</h1>
        <div v-else class="desc-line1">
          <el-input placeholder="以http://或https://开头" v-model="ip">
            <el-button slot="append" type="primary" @click="setIp">确定</el-button>
          </el-input>
        </div>
      </div>
      <el-tabs v-loading="qrLoading" element-loading-text="正在登陆中,请稍后" class="login-form-box" v-model="loginType"
               type="card">
        <el-tab-pane label="密码登陆" name="password">
          <el-form style="padding:0 20px;margin-top:40px" :model="loginForm" status-icon>
            <el-form-item class="form-item">
              <el-input v-model="loginForm.username" clearable placeholder="请输入用户名" auto-complete="off"
                        @change="inputVal">
                <i slot="prefix" class="iconfont icon-01"></i>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input type="password" v-model="loginForm.password" clearable placeholder="请输入密码" auto-complete="off"
                        @input="inputVal">
                <i slot="prefix" class="iconfont icon-mima"></i>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item" label="登录方式：">
              <el-radio-group v-model="loginForm.loginMode">
                <el-radio label="ACCOUNT">普通登录</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-item">
              <el-button v-loading="loading" class="login-btn" type="primary" @click="login" :disabled="!canLogin">登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
    <footer class="login-foot">
      Copyright ©有鱼apollo'
    </footer>
  </article>
</template>

<script>
  import ipObj from "@/api/ip";
  import "@/common/qrLogin";

  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          username: "",
          password: "",
          loginMode: "ACCOUNT"
        },
        loginType: "password",
        canLogin: false,
        type: 1,
        ipNum: 0,
        ip: "",
        codeUrl: "",
        loading: false,
        qrLoading: false
      };
    },
    mounted() {
      // this.getCode();
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.atomSize1, false);
    },
    methods: {
      inputVal() {
        this.canLogin =
          this.loginForm.username &&
          this.loginForm.password
      },

      async login() {
        if (this.loginForm.username && this.loginForm.password) {
          this.loginForm.loginSubmit = "登录";
          // this.loginForm.login-submit = "登录";
        }
        const res = await this.$auth.formLogin(this.loginForm);
        if (res == false) {
          return;
        }
        //todo fix 设置token
        localStorage.setItem("token", res.desc);
        this.$router.push("/applications");

      },

      async getMenu(id) {
        const lEnv = localStorage.getItem("iframeEnv");
        const menuRes = await this.$auth.getMenusByUserId({
          env: lEnv || "TEST",
          appCode: "middleBackground",
          userId: id
        });
        if (menuRes) {
          if (menuRes.data.length) {
            const menu = menuRes.data[0].menuVo;
            localStorage.setItem("menu", JSON.stringify(menu));
            const frameMap = this.getFrameMap(menu);

            localStorage.setItem("frameMap", JSON.stringify(frameMap));
            let arr = [];
            if (menu.length) {
              arr = menu;
              this.$router.push({
                path: this.getFirstPage(arr)
              });
            } else {
              this.$router.push({
                path: "/main"
              });
            }
            this.loading = false;
          } else {
            this.$router.push({
              path: "/noAuth"
            });
          }
        }
      },
      getFrameMap(data) {
        let frameMap = {};
        const fun = function (arr) {
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
      getFirstPage(arr) {
        let first = "";
        if (arr.length) {
          const fun = nav => {
            if (nav.children.length) {
              fun(nav.children[0]);
            } else {
              first = nav.path;
            }
          };
          fun(arr[0]);
        }
        return first;
      },
      // enterLogin() {
      //   if (this.loginForm.username && this.loginForm.password) {
      //     this.loginForm.loginSubmit = "登录";
      //     // this.loginForm.login-submit = "登录";
      //     debugger
      //     this.login(this.loginForm);
      //
      //   }
      // },
      clickIp() {
        this.ipNum += 1;
      },
      setIp() {
        ipObj.ip = this.ip;
        this.ipNum = 0;
      },
      // async getCode() {
      //   const res = await this.$auth.getVerifyCode();
      //   if (res) {
      //     this.loginForm.codeKey = res.data.codeKey;
      //     this.codeUrl = "data:image/png;base64," + res.data.captcha;
      //   }
      // },
      timeout() {
        this.timeH = setInterval(() => {
          if (this.smsSec) {
            this.smsSec--;
          } else {
            clearInterval(this.timeH);
          }
        }, 1000);
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "../common/common.scss";

  #atom {
    position: absolute;
    top: 60px;
  }

  .login-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: url("../assets/login-bg.jpg");
    .login-head {
      display: flex;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      .logo {
        margin-left: 20px;
        width: 50px;
      }
      .logo-name {
        margin-left: 10px;
        font-weight: 600;
        font-size: 24px;
        color: #fff;
      }
    }
    .login-body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .desc-box {
        color: #fff;
        z-index: 2;
        width: 300px;
        .desc-line1 {
          font-size: 30px;
          line-height: 36px;
          margin-bottom: 19px;
          font-weight: bold;
          text-align: left;
        }
        ul {
          text-align: left;
        }
        .desc-li {
          float: left;
          margin-right: 20px;
          font-size: 16px;
          letter-spacing: 0.47px;
          line-height: 30px;
        }
      }
      .login-form-box {
        background: #fff;
        height: 450px;
        width: 400px;
        border-radius: 8px;
        z-index: 2;
        .form-item {
          margin: 15px 0;
        }
        .login-title {
          text-align: left;
          margin: 20px 0 50px;
        }
        .login-btn {
          width: 100%;
        }
      }
    }
    .login-foot {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      background: rgba(0, 0, 0, 0.1);
    }
  }
</style>
