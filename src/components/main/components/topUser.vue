<template>
    <div>
        <el-tooltip class="top-icon" effect="light" content="登出" placement="bottom">
            <i @click="logout" class="el-icon-back"></i>
        </el-tooltip>
        <span style="float:right;line-height:50px;font-size:24px;">|</span>
        <el-tooltip class="top-icon" effect="light" content="修改密码" placement="bottom">
            <i @click="modPassVis = true" class="el-icon-setting"></i>
        </el-tooltip>
        <UserCenter :userInfo="userInfo" />
        <el-dialog title="修改密码" width="500px" :visible.sync="modPassVis">
            <el-form ref="modPass" :rules="rules" :model="modPassForm" label-width="100px">
                <el-form-item prop="oldPassword" label="旧密码">
                    <el-input type="password" v-model="modPassForm.oldPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="newPasswordF" label="新密码">
                    <el-input type="password" v-model="modPassForm.newPasswordF" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="newPasswordS" label="确认密码">
                    <el-input type="password" v-model="modPassForm.newPasswordS" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="modPassCancel">取 消</el-button>
                <el-button type="primary" @click="modPassSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import UserCenter from "./userCenter";
import MsgCenter from "./msgCenter";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      modPassVis: false,
      modPassForm: {},
      rules: {
        oldPassword: [{ required: true, message: "必填", trigger: "blur" }],
        newPasswordF: [{ required: true, message: "必填", trigger: "blur" }],
        newPasswordS: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  components: {
    UserCenter,
    MsgCenter
  },
  methods: {
    logout() {
      this.$confirm(`确定要登出么?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.runLogout();
      });
    },
    async runLogout() {
      const res = await this.$auth.logout();
      if (res) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        localStorage.removeItem("menu");
        this.$router.push({ path: "/" });
        this.$message({
          type: "success",
          message: "登出成功!"
        });
      }
    },
    modPassCancel() {
      this.modPassVis = false;
      this.$refs["modPass"].resetFields();
    },
    modPassSure() {
      this.$refs["modPass"].validate(valid => {
        if (valid) {
          this.modPassRun();
        }
      });
    },
    async modPassRun() {
      const res = await this.$upms.modPassword(this.modPassForm);
      if (res) {
        this.$message({
          type: "success",
          message: "密码修改成功，请重新登录"
        });
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.top-icon {
  float: right;
  font-size: 30px;
  line-height: 50px;
  margin: 0 10px;
  cursor: pointer;
  color: #333;
}
.top-icon:hover {
  transform: scale(1.2);
}
</style>
