<template>
    <div class="box">
        <h3>添加包渠道</h3>
        <el-form ref="addForm" :model="form" :rules="rules" label-width="140px">
            <el-form-item prop="packageVersionId" label="版本包">
                <el-select v-model="form.packageVersionId">
                    <el-option v-for="(item,id) in allPackage" :key="id" :value="id|toNum" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="channelCode" label="渠道名称">
                <el-select v-model="form.channelCode">
                    <el-option v-for="(item,id) in channels" :key="id" :value="id|toNum" :label="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="source值">
                <el-input disabled="" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="tabType" label="上架类型">
                <el-select v-model="form.tabType">
                    <el-option v-for="(item,id) in tabs" :key="id" :value="id|toNum" :label="item"></el-option>                    
                </el-select>
            </el-form-item>
        </el-form>
        <div class="operbar">
            <el-button @click="()=>$router.back()">取消</el-button>
            <el-button :loading="loading" @click="handleSure" type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        packageVersionId: [
          { required: true, message: "必选", trigger: "change" }
        ],
        channelCode: [{ required: true, message: "必选", trigger: "change" }],
        tabType: [{ required: true, message: "必选", trigger: "change" }]
      },
      allPackage: {},
      channels: {},
      tabs: {},
      loading: false,
      pLoading: false,
      cLoading: false,
      tLoading: false
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
  methods: {
    init() {
      this.getVersionPackage();
      this.getchannels();
      this.getTabTypes();
    },
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.runAdd();
        }
      });
    },
    async runAdd() {
      this.loading = true;
      const res = await this.$base.savePackageVersionChannel(this.form);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/packagePut/channel");
      }
    },
    async getVersionPackage() {
      this.pLoading = true;
      const res = await this.$base.getAllPackageInfo();
      this.pLoading = false;
      if (res) {
        this.allPackage = res.data;
      }
    },
    async getchannels() {
      this.cLoading = true;
      const res = await this.$base.getAllChannel();
      this.cLoading = false;
      if (res) {
        this.channels = res.data;
      }
    },
    async getTabTypes() {
      this.tLoading = true;
      const res = await this.$base.getAllTab();
      this.tLoading = false;
      if (res) {
        this.tabs = res.data;
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
