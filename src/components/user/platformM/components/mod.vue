<template>
  <FormPage @ok="handleSure" descTitle="修改后台" descCon="用于修改已有的后台，包括后台名称、URL地址、以及权限部门和备注" @cancel="$emit('close')">
    <el-form ref="modForm" :model="modData" :rules="rules" label-width="80px">
      <el-form-item prop="backgroundName" label="后台名称">
        <el-input v-model="modData.backgroundName"></el-input>
      </el-form-item>
       <el-form-item prop="code" label="code">
        <el-input disabled v-model="modData.code"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="URL地址">
        <el-input v-model="modData.url"></el-input>
      </el-form-item>
      <el-form-item prop="departmentIds" label="所属部门">
        <el-select disabled multiple filterable v-model="modData.departmentIds">
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="showDia" type="text">选择</el-button>
      </el-form-item>
      <el-dialog title="所属部门" :visible.sync="treeDialogShow" width="500px">
        <el-tree ref="tree" :data="allDep" auto-expand-parent :default-expanded-keys="modData.departmentIds" check-strictly show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="selDepart">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="备注">
        <el-input v-model="modData.remark" type="textarea" rows="4"></el-input>
      </el-form-item>
    </el-form>
  </FormPage>
</template>
<script>
import rules from "@/common/rules";

export default {
  data() {
    return {
      modData: {},
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      rules: {
        backgroundName: [
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
    rowData: Object
  },
  created() {
    this.getDep();
  },
  mounted() {
    this.modData = JSON.parse(JSON.stringify(this.rowData));
    this.setDep();
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
      const res = await this.$users.updateBack(this.modData);
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$refs["modForm"].resetFields();
        this.$emit("close");
        this.$emit("search");
      }
    },
    showDia() {
      this.treeDialogShow = true;
      setTimeout(() => {
        this.$refs["tree"].setCheckedKeys(this.modData.departmentIds);
      }, 0);
    },
    selDepart() {
      const arr = this.$refs["tree"].getCheckedNodes();
      this.selDep = arr;
      this.modData.departmentIds = arr.map(item => item.id);
      this.treeDialogShow = false;
    },
    setDep() {
      this.selDep = JSON.parse(JSON.stringify(this.modData.depts));
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

