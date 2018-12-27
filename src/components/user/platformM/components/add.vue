<template>
  <FormPage @ok="handleSure" descTitle="添加后台" descCon="用于新建后台，包括后台名称、URL地址、以及权限部门和权限角色，其中权限角色选项来源于添加者可分配角色" @cancel="$emit('close')">
    <el-form ref="addForm" :model="addData" :rules="rules" label-width="80px">
      <el-form-item prop="backgroundName" label="后台名称">
        <el-input v-model="addData.backgroundName"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="code">
        <el-input v-model="addData.code"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="URL地址">
        <el-input v-model="addData.url"></el-input>
      </el-form-item>
      <el-form-item prop="departmentIds" label="所属部门">
        <el-select style="width:300px" disabled multiple filterable v-model="addData.departmentIds">
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="treeDialogShow=true" type="text">选择</el-button>
      </el-form-item>
      <el-dialog title="所属部门" :visible.sync="treeDialogShow" width="500px">
        <el-tree ref="tree" :data="allDep" @check="checkTree" check-strictly show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="selDepart">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="权限角色">
        <el-select filterable multiple v-model="addData.roleIds">
          <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="addData.remark" type="textarea" rows="4"></el-input>
      </el-form-item>
    </el-form>
  </FormPage>
</template>
<script>
import rules from "@/common/rules";

export default {
  data() {
    return {
      addData: {},
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      rules: {
        backgroundName: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        code: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        url: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        departmentIds: [{ required: true, message: "必填", trigger: "change" }]
      },
      treeDialogShow: false,
      defaultProps: {
        children: "childrens",
        label: "name"
      },
      allDep: [],
      selDep: []
    };
  },
  props: {
    roles: Array
  },
  created() {
    this.getDep();
  },
  methods: {
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.runAdd();
        }
      });
    },
    async runAdd() {
      const res = await this.$users.addBack(this.addData);
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$refs["addForm"].resetFields();
        this.$emit("search");
        this.$emit("close");
      }
    },
    checkTree(obj, state) {
      // const exs = state.checkedKeys.indexOf(obj.id);
      // const id = obj.id;
      // this.$refs["tree"].setCheckedKeys([]);
      // if (exs > -1) {
      //   this.$refs["tree"].setCheckedKeys([id]);
      // }
    },
    selDepart() {
      const arr = this.$refs["tree"].getCheckedNodes();
      this.selDep = arr;
      this.addData.departmentIds = arr.map(item => item.id);
      this.treeDialogShow = false;
    },
    async getDep() {
      const res = await this.$users.getDepByComId(this.userInfo.companyId);
      if (res) {
        this.allDep = res.data;
      }
    }
  }
};
</script>
<style scoped>
* >>> .el-select__tags-text {
  color: #333;
}
</style>

