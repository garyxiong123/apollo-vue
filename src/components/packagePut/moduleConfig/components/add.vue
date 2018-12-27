<template>
    <div class="box">
        <h3>添加模块管理</h3>
        <el-form ref="addForm" :model="form" :rules="rules" label-width="140px">
            <el-form-item prop="permissionName" label="模块类型">
                <el-input v-model="form.permissionName"></el-input>
            </el-form-item>
            <el-form-item prop="permissionName" label="模块键">
                <el-input v-model="form.permissionName"></el-input>
            </el-form-item>
            <el-form-item prop="permissionName" label="模块值">
                <el-input v-model="form.permissionName"></el-input>
            </el-form-item>
            <el-form-item prop="permissionName" label="模块描述">
                <el-input v-model="form.permissionName"></el-input>
            </el-form-item>
        </el-form>
        <div class="operbar">
            <el-button @click="()=>$router.back()">取消</el-button>
            <el-button type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {},
      loading: false
    };
  },
  methods: {
    handleSure() {}
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
