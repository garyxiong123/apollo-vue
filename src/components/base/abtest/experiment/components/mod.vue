<template>
  <div class="box">
    <operBar :navs="['返回上级','编辑实验']"/>
    <el-form style="margin-top:20px" ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="experimentName" label="实验名">
        <el-input v-model="form.experimentName" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="experimentKey" label="key">
        <el-input disabled v-model="form.experimentKey" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input v-model="form.description" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="策略类型">
        <el-select disabled v-model="form.strategyType">
          <el-option v-for="item in strategyArr" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="productId" label="产品">
        <el-select disabled :loading="proLoading" filterable v-model="form.productId">
          <el-option
            v-for="item in proArr"
            :key="item.id"
            :value="item.id"
            :label="item.productName"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="operbar">
      <el-button :loading="loading" @click="handleSure" type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
import { ObjToFormData } from "@/util";
export default {
  data() {
    return {
      form: {
        strategyType: 1
      },
      proArr: [],
      strategyArr: [
        { id: 1, name: "百分比" },
        { id: 2, name: "指定设备" },
        { id: 3, name: "指定用户" }
      ],
      rules: {
        experimentName: [{ required: true, trigger: "blur", message: "必填" }],
        experimentKey: [{ required: true, trigger: "blur", message: "必填" }],
        description: [{ required: true, trigger: "blur", message: "必填" }],
        productId: [{ required: true, trigger: "blur", message: "必选" }]
      },
      proLoading: false,
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPro();
      this.form = JSON.parse(sessionStorage.getItem("abtestExp"));
    },
    async getPro() {
      this.proLoading = true;
      const res = await this.$base.abtestGetAllProduct();
      this.proLoading = false;
      if (res) {
        this.proArr = res.data;
      }
    },
    handleSure() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.handlerRun();
        }
      });
    },
    async handlerRun() {
      this.loading = true;
      const res = await this.$base.editExperiment(
        ObjToFormData({
          id: this.form.id,
          experimentName: this.form.experimentName,
          description: this.form.description
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
