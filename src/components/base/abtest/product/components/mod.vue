<template>
  <div v-loading="proLoading" class="box">
    <operBar :navs="['返回上级','编辑用户产品']"/>
    <el-form style="margin-top:20px" ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" disabled style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="产品">
        <el-select style="width:300px" multiple filterable v-model="form.pro">
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
      form: {},
      proArr: [],
      proLoading: false,
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.getPro();
    },
    async getPro() {
      this.proLoading = true;
      const res = await this.$base.abtestGetAllProduct();
      this.proLoading = false;
      if (res) {
        this.proArr = res.data;
        this.copyForm();
      }
    },
    copyForm() {
      const { username, userId, products } = JSON.parse(
        sessionStorage.getItem("abtestUserProduct")
      );
      this.form = {
        username,
        userId,
        pro: products.map(item => {
          return item.id;
        })
      };
    },
    async handleSure() {
      this.loading = true;
      const res = await this.$base.editUserProduct(
        ObjToFormData({
          userId: this.form.userId,
          productIds: this.form.pro.join(",")
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
  width: calc((100vw - 420px) * 0.6);
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
