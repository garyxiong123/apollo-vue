<template>
  <FormPage descTitle="修改菜单" @ok="handleSure" @cancel="$emit('close')">
    <el-form ref="modForm" :model="modForm" :rules="rules" label-width="100px">
      <el-form-item prop="permissionName" label="权限名称">
        <el-input v-model="modForm.permissionName"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="接口地址">
        <el-input v-model="modForm.url"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="modForm.type">
          <el-option label="菜单" :value="1"></el-option>
          <el-option label="按钮" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="method" label="请求方法">
        <el-select filterable v-model="modForm.method">
          <el-option label="ALL" value="all"></el-option>
          <el-option v-for="item in allMethod" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="backgroundId" label="所属后台">
        <el-select @change="getAllMenu" v-model="modForm.backgroundId" filterable>
          <el-option v-for="item in allBack" :key="item.id" :label="item.backgroundName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="parentId" label="父节点">
        <el-select v-model="modForm.parentId" filterable>
          <el-option v-for="item in allMenu" :key="item.id" :label="item.permissionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="parameter" label="特殊参数">
        <el-input placeholder="多个参数以/分隔" v-model="modForm.parameter"></el-input>
      </el-form-item>
      <el-form-item prop="orderId" label="排序优先级">
        <el-input v-model="modForm.orderId"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="modForm.remark" type="textarea" rows="4"></el-input>
      </el-form-item>
    </el-form>
  </FormPage>
</template>
<script>
import rules from "@/common/rules";

export default {
  data() {
    return {
      modForm: {},
      rules: {
        permissionName: [{ required: true, message: "必填", trigger: "blur" }, { validator: rules.validateBlank, trigger: "blur" }],
        url: [{ required: true, message: "必填", trigger: "blur" }, { validator: rules.validateBlank, trigger: "blur" }],
        parentId: [{ required: true, message: "必选", trigger: "change" }],
        method: [{ required: true, message: "必选", trigger: "change" }],
        backgroundId: [{ required: true, message: "必选", trigger: "change" }],
        orderId: [
          {
            validator: rules.validateNoReNum,
            trigger: "blur"
          }
        ]
      },
      allMethod: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD", "TRACE"],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      allMenu: []
    };
  },
  props: {
    allBack: Array,
    modDataO: Object
  },
  mounted() {
    this.modForm = JSON.parse(JSON.stringify(this.modDataO));
    this.getAllMenu(false);
  },
  methods: {
    handleSure() {
      this.$refs["modForm"].validate(valid => {
        if (valid) {
          this.runMod();
        }
      });
    },
    async runMod() {
      const res = await this.$users.updateMenu(this.modForm);
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$emit("search");
        this.$emit("close");
      }
    },
    async getAllMenu(flag = true) {
      const res = await this.$users.getMenus(this.modForm.backgroundId);
      if (res) {
        this.allMenu = res.data;
        if (flag) {
          this.$set(this.modForm, "parentId", null);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>