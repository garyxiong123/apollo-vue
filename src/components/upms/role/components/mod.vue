<template>
  <FormPage @cancel="$emit('close')" @ok="handleSure" descTitle="修改角色" descCon="">
    <el-form ref="modForm" :model="modData" :rules="rules" label-width="120px">
      <el-form-item prop="roleName" label="角色名称">
        <el-input v-model="modData.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="modData.description" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item prop="scope" label="权限范围">
        <el-select v-model="modData.scope">
          <el-option v-if="modData.assignableRoleScope.indexOf(1)!==-1" label="所有数据" :value="1"></el-option>
          <el-option v-if="modData.assignableRoleScope.indexOf(2)!==-1" label="公司全部数据" :value="2"></el-option>
          <el-option v-if="modData.assignableRoleScope.indexOf(3)!==-1" label="所选后台全部数据" :value="3"></el-option>
          <el-option v-if="modData.assignableRoleScope.indexOf(4)!==-1" label="个人数据" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="backgroundIds" v-if="modData.scope&&modData.scope!==1&&modData.scope!==2" label="选择后台">
        <el-select filterable change="resetBack" style="width:80%" multiple v-model="modData.backgroundIds">
          <el-option v-for="item in modData.assignableBackground" :key="item.id" :label="item.backgroundName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="modData.scope ===4" label="选择后台菜单">
        <el-radio-group v-model="modData.backId">
          <el-radio-button v-for="item in setBacks" :key="item.id" :label="item.id">{{item.backgroundName}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="min-height:100px;max-height:500px;overflow:auto" v-show="modData.backId&&modData.scope ===4">
        <TreeInfo></TreeInfo>
        <DTree v-show="item.backgroundId === modData.backId" v-for="(item,index) in modData.assignablePermission.filter(item=>modData.backgroundIds.indexOf(item.backgroundId)!==-1)" :key="item.backgroundId" :data="item.children" :ref="`tree${index}`" show-checkbox node-key="id" :props="defaultProps"></DTree>
      </el-form-item>
      <span v-if="validT" style="color:red">请至少选择一个个人权限</span>
    </el-form>
  </FormPage>
</template>
<script>
import DTree from "./tree";
import TreeInfo from "./treeInfo";
import rules from "@/common/rules";
export default {
  data() {
    return {
      rules: {
        roleName: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        scope: [{ required: true, message: "必选", trigger: "change" }],
        backgroundIds: [{ required: true, message: "必选", trigger: "change" }]
      },
      validT: false,
      modData: {},
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  props: {
    modDataO: Object
  },
  components: {
    DTree,
    TreeInfo
  },
  computed: {
    setBacks() {
      const arr = this.modData.assignableBackground.filter(item => {
        if (this.modData.backgroundIds) {
          if (this.modData.backgroundIds.indexOf(item.id) !== -1) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      return arr;
    }
  },
  created() {
    this.modData = JSON.parse(JSON.stringify(this.modDataO));

    if (this.modData.backgrounds) {
      this.$set(
        this.modData,
        "backgroundIds",
        this.modData.backgrounds.map(item => item.id)
      );
    }
  },
  mounted() {
    this.setTree();
  },
  methods: {
    resetBack() {
      this.$set(this.modData, "backId", "");
    },
    setTree() {
      for (let i = 0; i < this.modData.assignablePermission.length; i++) {
        try {
          this.$refs[`tree${i}`][0].setCheckedKeys(
            this.modData.personalPermissionIds
          );
          this.$refs[`tree${i}`][0].setCheckedKeys2(
            this.modData.assignablePermissionIds
          );
        } catch (err) {}
      }
    },
    getAllKey() {
      let perArr1 = [];
      let perArr2 = [];
      for (let i = 0; i < this.modData.assignablePermission.length; i++) {
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
      this.$refs["modForm"].validate(valid => {
        if (valid) {
          this.validList();
        }
      });
    },
    validList() {
      if (this.modData.scope === 4) {
        const keys = this.getAllKey();
        this.modData.personalPermissionIds = keys.key1;
        this.modData.assignablePermissionIds = keys.key2;
        if (this.modData.personalPermissionIds.length) {
          this.modRun();
        } else {
          this.validT = true;
        }
      } else {
        this.modRun();
      }
    },
    async modRun() {
      this.validT = false;
      const res = await this.$upms.updateRole(this.modData);
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
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
