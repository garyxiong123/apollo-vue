<template>
  <FormPage @cancel="$emit('close')" @ok="handleSure" descTitle="新增机构" descCon="新增机构包括公司和部门两种形式，公司下可以有部门，部门下则不可以有公司">
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px">
      <el-form-item prop="name" label="机构名称">
        <el-input clearable v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级机构">
        <el-select disabled v-model="addForm.parentId" filterable clearable>
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="treeDialogShow=true" type="text">选择</el-button>
      </el-form-item>
      <el-dialog title="上级机构" :visible.sync="treeDialogShow" width="500px">
        <el-tree ref="tree" :data="allDep" @check="checkTree" check-strictly show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="selDepart">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="机构类型">
        <el-select v-model="addForm.type">
          <el-option label="公司" value="COM"></el-option>
          <el-option label="部门" value="DEPT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="addForm.remark" type="textarea" rows="4"></el-input>
      </el-form-item>
    </el-form>
  </FormPage>
</template>
<script>
import rules from "@/common/rules";

export default {
  data() {
    return {
      addForm: {
        type: "DEPT"
      },
      rules: {
        name: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ]
      },
      treeDialogShow: false,
      defaultProps: {
        children: "childrens",
        label: "name"
      },
      selDep: []
    };
  },
  props: {
    allCom: Array,
    allDep: Array
  },
  methods: {
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.addRun();
        }
      });
    },
    async addRun() {
      const res = await this.$users.addOrg(this.addForm);
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
      const exs = state.checkedKeys.indexOf(obj.id);
      const id = obj.id;
      this.$refs["tree"].setCheckedKeys([]);
      if (exs > -1) {
        this.$refs["tree"].setCheckedKeys([id]);
      }
    },
    selDepart() {
      const arr = this.$refs["tree"].getCheckedNodes();
      this.selDep = arr.length ? arr : [];
      this.addForm.parentId = arr.length ? arr[0].id : null;
      this.treeDialogShow = false;
    }
  }
};
</script>
<style scoped>
* >>> .el-input__inner {
  color: #333 !important;
}
</style>
