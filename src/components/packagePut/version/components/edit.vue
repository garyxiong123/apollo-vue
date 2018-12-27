<template>
    <div class="box">
        <h3>编辑版本包</h3>
        <el-form ref="editForm" :model="form" :rules="rules" label-width="140px">
            <el-form-item prop="version" label="版本号">
                <el-input placeholder="如：3.2.0" v-model="form.version"></el-input>
            </el-form-item>
            <el-form-item prop="packageName" label="包名">
                <el-input placeholder="如：9188公积金" v-model="form.packageName"></el-input>
            </el-form-item>
            <el-form-item prop="deviceType" label="设备类型">
               <el-select :loading="dLoading" v-model="form.deviceType">
                   <el-option v-for="(item,id) in allDevice" :key="id" :value="id|toNum" :label="item"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item prop="packageType" label="包类型">
                <el-select :loading="pLoading" v-model="form.packageType">
                    <el-option v-for="(item,id) in allType" :key="id" :value="id|toNum" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="packagePath" label="包路径">
                <el-input placeholder="如：com.test.test" v-model="form.packagePath"></el-input>
            </el-form-item>
            <el-form-item prop="remark" label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="operbar">
            <el-button @click="()=>$router.back()">取消</el-button>
            <el-button @click="handleSure" :loading="loading" type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        version: [{ required: true, message: "必填", trigger: "blur" }],
        packageName: [{ required: true, message: "必填", trigger: "blur" }],
        deviceType: [{ required: true, message: "必选", trigger: "change" }],
        packageType: [{ required: true, message: "必选", trigger: "change" }],
        packagePath: [{ required: true, message: "必填", trigger: "blur" }]
      },
      allDevice: {},
      allType: {},
      loading: false,
      dLoading: false,
      pLoading: false
    };
  },
  filters: {
    toNum(val) {
      return parseInt(val, 10);
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.form = JSON.parse(sessionStorage.getItem("nowVersion"));
  },
  methods: {
    init() {
      this.getDeviceType();
      this.getPackageType();
    },
    handleSure() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.runEdit();
        }
      });
    },
    async runEdit() {
      this.loading = true;
      const {id,deviceType,packageName,packagePath,packageType,version,remark}=this.form;
      const data = {id,deviceType,packageName,packagePath,packageType,version,remark};
      const res = await this.$base.updatePackageVersion(data);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/packagePut/version");
      }
    },
    async getDeviceType() {
      const res = await this.$base.getAllDeviceType();
      if (res) {
        this.allDevice = res.data;
      }
    },
    async getPackageType() {
      const res = await this.$base.getAllPackageType();
      if (res) {
        this.allType = res.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: calc((100vw - 420px) * 0.8);
  min-width: 880px;
  margin: 10px auto;
  padding: 15px;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.operbar {
  text-align: right;
}
</style>
