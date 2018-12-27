<template>
  <div class="box">
    <operBar :navs="['返回上级','编辑策略']"/>
    <el-form style="margin-top:20px" ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="strategyName" label="策略名">
        <el-input v-model="form.strategyName" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="strategyKey" label="key">
        <el-input disabled v-model="form.strategyKey" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input v-model="form.description" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item v-if="strategyType==1" label="百分比">
        <el-input-number v-model="form.numberOrUploadCode" :min="1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item v-else-if="strategyType==2" label="指定设备">
        <Upload v-model="form.numberOrUploadCode"></Upload>
      </el-form-item>
      <el-form-item v-else label="指定用户">
        <Upload v-model="form.numberOrUploadCode"></Upload>
      </el-form-item>
    </el-form>
    <div class="operbar">
      <el-button :loading="loading" @click="handleSure" type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
import Upload from "./upload";
import { ObjToFormData } from "@/util";
export default {
  data() {
    return {
      strategyType: this.$route.query.strategyType,
      experimentId: this.$route.query.experimentId,
      rules: {
        strategyName: { required: true, message: "必填", trigger: "blur" },
        strategyKey: { required: true, message: "必填", trigger: "blur" },
        description: { required: true, message: "必填", trigger: "blur" }
      },
      form: {},
      loading: false
    };
  },
  components: {
    Upload
  },
  created() {
    const {
      id,
      description,
      strategyKey,
      strategyName,
      strategyRule,
      numberOrUploadCode
    } = JSON.parse(sessionStorage.getItem("strategyData"));
    const form = {
      description,
      strategyKey,
      strategyName
    };
    this.id = id;
    if (this.strategyType == 1) {
      form.numberOrUploadCode = parseInt(strategyRule.split(" ")[2], 10);
    }
    this.form = form;
  },
  methods: {
    handleSure() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.handleRun();
        }
      });
    },
    async handleRun() {
      this.loading = true;
      const res = await this.$base.editStrategy(
        this.id,
        ObjToFormData({
          ...this.form,
          experimentId: this.experimentId
        })
      );
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.back();
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
 