<template>
  <FormPage @cancel="$emit('close')" @ok="handleSure" descTitle="新增角色" descCon="">
    <el-form ref="addForm" :model="addData" :rules="rules" label-width="120px">
      <el-form-item prop="roleName" label="角色名称">
        <el-input v-model="addData.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addData.description" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item prop="scope" label="权限范围">
        <el-select v-model="addData.scope">
          <el-option v-if="canAssignObj.assignableRoleScope.indexOf(1) !== -1" label="所有数据" :value="1"></el-option>
          <el-option v-if="canAssignObj.assignableRoleScope.indexOf(2) !== -1" label="公司全部数据" :value="2"></el-option>
          <el-option v-if="canAssignObj.assignableRoleScope.indexOf(3) !== -1" label="所选后台全部数据" :value="3"></el-option>
          <el-option v-if="canAssignObj.assignableRoleScope.indexOf(4) !== -1" label="个人数据" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="backgroundIds" v-if="addData.scope===3||addData.scope===4" label="选择后台">
        <el-select filterable style="width:50%" @change="resetBack" multiple v-model="addData.backgroundIds">
          <el-option v-for="item in canAssignObj.assignableBackground" :key="item.id" :label="item.backgroundName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="addData.scope ===4" label="选择后台菜单">
        <el-radio-group v-model="addData.backId">
          <el-radio-button v-for="item in setBacks" :key="item.id" :label="item.id">{{item.backgroundName}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="personalPermissionIds" style="min-height:100px;max-height:500px;overflow:auto" v-if="addData.scope ===4">
        <TreeInfo></TreeInfo>
        <DTree v-show="item.backgroundId === addData.backId" v-for="(item,index) in canAssignObj.assignablePermission.filter(item=>addData.backgroundIds.indexOf(item.backgroundId)!==-1)" :key="item.backgroundId" :data="item.children" :ref="`tree${index}`" show-checkbox node-key="id" :props="defaultProps"></DTree>
      </el-form-item>
    </el-form>
    <!-- <span v-if="validB" style="color:red">至少选中一个个人权限</span> -->
  </FormPage>
</template>
<script>
import DTree from "./tree";
import TreeInfo from "./treeInfo";
import rules from "@/common/rules";
export default {
  data() {
    return {
      treeShow: false,
      addData: {
        backgroundIds: []
      },
      treeData: [],
      rules: {
        roleName: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        scope: [{ required: true, message: "必选", trigger: "change" }],
        backgroundIds:[{ required: true, message: "必选", trigger: "change" }],
        personalPermissionIds:[{ required: true, message: "请至少选中一个个人权限", trigger: "change" }]
      },
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  props: {
    canAssignObj: Object
  },
  components: {
    DTree,
    TreeInfo
  },
  computed: {
    setBacks() {
      const arr = this.canAssignObj.assignableBackground.filter(item => {
        if (this.addData.backgroundIds.indexOf(item.id) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      return arr;
    }
  },
  methods: {
    resetBack() {
      this.$set(this.addData, "backId", "");
    },
    getAllKey() {
      let perArr1 = [];
      let perArr2 = [];
      for (let i = 0; i < this.canAssignObj.assignablePermission.length; i++) {
        try {
          const arr1 = this.$refs[`tree${i}`][0]
            .getCheckedKeys()
            .concat(this.$refs[`tree${i}`][0].getHalfCheckedKeys());
          perArr1 = perArr1.concat(arr1);
          const arr2 = this.$refs[`tree${i}`][0]
            .getCheckedKeys2()
            .concat(this.$refs[`tree${i}`][0].getHalfCheckedKeys2());
          perArr2 = perArr2.concat(arr2);
        } catch (err) {}
      }
      return {
        key1: perArr1,
        key2: perArr2
      };
    },
    handleSure() {
      if (this.addData.scope === 4) {
        const keys = this.getAllKey();
        this.addData.personalPermissionIds = keys.key1;
        this.addData.assignablePermissionIds = keys.key2;
      }
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.addRun();
        }
      });
    },
    async addRun() {
      const res = await this.$users.addRole(this.addData);
      if (res) {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.$emit("search");
        this.$emit("close");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
