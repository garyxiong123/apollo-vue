<template>
  <FormPage @cancel="$emit('close')" @ok="handleSure" descTitle="修改机构" descCon="修改已存在的机构">
    <el-form ref="modForm" :model="modForm" :rules="rules" label-width="80px">
      <el-form-item prop="name" label="机构名称">
        <el-input clearable v-model="modForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级机构">
        <el-select disabled v-model="modForm.parentId" filterable clearable>
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="showDia" type="text">选择</el-button>
      </el-form-item>
      <el-dialog title="上级机构" :visible.sync="treeDialogShow" width="500px">
        <el-tree ref="tree" :data="allDep" @check="checkTree" check-strictly auto-expand-parent :default-expanded-keys="[modForm.parentId]" show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="selDepart">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="机构类型">
        <el-select disabled v-model="modForm.type">
          <el-option label="公司" value="COM"></el-option>
          <el-option label="部门" value="DEPT"></el-option>
        </el-select>
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
    allDep: Array,
    modData: Object
  },
  mounted() {
    this.modForm = {
      id: this.modData.id,
      name: this.modData.name,
      parentId: this.modData.parentId,
      type: this.modData.type,
      remark: this.modData.remark
    };
    if (this.modForm.parentId)
      this.selDep = [
        { id: this.modData.parentId, name: this.modData.parentName }
      ];
  },
  methods: {
    handleSure() {
      this.$refs["modForm"].validate(valid => {
        if (valid) {
          this.modRun();
        }
      });
    },
    async modRun() {
      const data = {
        id: this.modForm.id,
        name: this.modForm.name,
        parentId: this.modForm.parentId,
        type: this.modForm.type,
        remark: this.modForm.remark
      };
      const res = await this.$upms.updateOrg(data);
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$refs["modForm"].resetFields();
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
      this.modForm.parentId = arr.length ? arr[0].id : null;
      this.treeDialogShow = false;
    },
    showDia() {
      this.treeDialogShow = true;
      setTimeout(() => {
        this.$refs["tree"].setCheckedKeys([this.modForm.parentId]);
      }, 0);
    }
  }
};
</script>
<style scoped>
* >>> .el-input__inner {
  color: #333 !important;
}
</style>
