<template>
  <formPage descTitle="新增用户" @ok="handleSure" @cancel="$emit('close')">
    <el-form ref="addForm" :model="addData" :rules="rules" label-width="90px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="addData.username"></el-input>
      </el-form-item>
      <el-form-item prop="realName" label="真实姓名">
        <el-input v-model="addData.realName"></el-input>
      </el-form-item>
      <el-form-item prop="passwordF" label="密码">
        <el-input type="password" v-model="addData.passwordF"></el-input>
      </el-form-item>
      <el-form-item prop="passwordT" label="确认密码">
        <el-input type="password" v-model="addData.passwordT"></el-input>
      </el-form-item>
      <el-form-item label="所属公司">
        <el-select filterable v-model="addData.companyId" @change="resetDepart">
          <el-option v-for="item in allCom" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :prop="addData.companyId==10001?'beDepart':''" label="所属部门">
        <span
          v-if="addData.companyId==10001"
          style="color:#f56c6c;position:absolute;top:0;left:-78px"
        >*</span>
        <el-select
          style="width:400px;"
          disabled
          filterable
          multiple
          @change="changebeDepart"
          v-model="addData.beDepart"
        >
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="treeDialogShow=true" type="text">选择</el-button>
        <div
          v-if="addData.companyId==10001?showV:false"
          style="line-height:1px;margin-top:8px;margin-left:3px"
        >
          <span style="color: #f56c6c;font-size: 12px;">必选</span>
        </div>
      </el-form-item>
      <el-dialog title="所属部门" :visible.sync="treeDialogShow" width="500px">
        <el-tree
          ref="tree"
          :data="allDep"
          check-strictly
          show-checkbox
          node-key="id"
          :props="defaultProps"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="selDepart">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="管理部门">
        <el-select style="width:400px;" multiple v-model="addData.maDepart">
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="addData.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="addData.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="addData.phone"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="addData.state">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="未激活" :value="4"></el-option>
          <el-option label="禁用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="role" label="用户角色">
        <el-select
          style="width:400px;"
          @change="changeUserRole"
          filterable
          multiple
          v-model="addData.role"
        >
          <el-option v-for="item in uMRole" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可分配角色">
        <el-select style="width:400px;" multiple v-model="addData.asRole">
          <el-option
            v-for="item in setAsRole"
            :key="item.id"
            filterable
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="addData.remark" type="textarea" rows="4"></el-input>
      </el-form-item>
    </el-form>
  </formPage>
</template>
<script>
import rules from "@/common/rules";
export default {
  data() {
    return {
      addData: {},
      rules: {
        username: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        realName: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        phone: [{ validator: rules.validatePhone, trigger: "blur" }],
        passwordF: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        passwordT: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: rules.validateBlank, trigger: "blur" }
        ],
        role: [{ required: true, message: "必填", trigger: "change" }]
      },
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      treeDialogShow: false,
      defaultProps: {
        children: "childrens",
        label: "name"
      },
      allDep: [],
      selDep: [],
      uMDepart: [],
      uMRole: [],
      showV: false
    };
  },
  props: {
    allCom: Array
  },
  computed: {
    setBeDepa() {
      return this.uMDepart.filter(item => {
        return item.parentCompany.id === this.addData.companyId;
      });
    },
    setMDepa() {
      return this.uMDepart.filter(item => {
        if (this.addData.beDepart) {
          return this.addData.beDepart.indexOf(item.id) !== -1;
        } else {
          return false;
        }
      });
    },
    setAsRole() {
      return this.uMRole.filter(item => {
        if (this.addData.role) {
          return this.addData.role.indexOf(item.id) !== -1;
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.getDep(10001);
    this.getUMDepart();
    this.getUMRole();
  },
  mounted() {
    this.setDefault();
  },
  methods: {
    setDefault() {
      this.$set(this.addData, "companyId", 10001);
      this.$set(this.addData, "state", 1);
      this.$set(this.addData, "sex", 1);
    },
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (this.addData.beDepart.length || this.addData.companyId != 10001) {
          this.showV = false;
          if (valid) {
            if (this.addData.passwordF === this.addData.passwordT) {
              this.makeData();
              this.runAdd();
            } else {
              this.$message({
                type: "warning",
                message: "两次密码输入不一致"
              });
            }
          }
        } else {
          this.showV = true;
        }
      });
    },
    resetDepart(id) {
      this.getDep(id);
      this.addData.beDepart = [];
      this.addData.maDepart = [];
    },
    makeData() {
      const addData = JSON.parse(JSON.stringify(this.addData));
      addData.beDepart = addData.beDepart.filter(item => {
        return addData.maDepart.indexOf(item) === -1;
      });
      addData.role = addData.role.filter(item => {
        return addData.asRole.indexOf(item) === -1;
      });
      const de1 = addData.beDepart.map(item => {
        return {
          organizationId: item,
          manageable: false
        };
      });
      const de2 = addData.maDepart.map(item => {
        return {
          organizationId: item,
          manageable: true
        };
      });
      const ro1 = addData.role.map(item => {
        return {
          roleId: item,
          assignable: false
        };
      });
      const ro2 = addData.asRole.map(item => {
        return {
          roleId: item,
          assignable: true
        };
      });
      this.addData.userOrganizations = de1.concat(de2);

      this.addData.userRoles = ro1.concat(ro2);
    },
    async runAdd() {
      const res = await this.$upms.addUser(this.addData);
      if (res) {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.$emit("search");
        this.$emit("close");
      }
    },
    selDepart() {
      const arr = this.$refs["tree"].getCheckedNodes();
      this.selDep = arr;
      this.addData.beDepart = arr.map(item => item.id);
      this.treeDialogShow = false;
      this.changebeDepart(this.addData.beDepart);
    },
    async getDep(id) {
      const res = await this.$upms.getDepByComId(id);
      if (res) {
        this.allDep = res.data;
      }
    },
    async getUMDepart() {
      const res = await this.$upms.getCurrUserManageDepts();
      if (res) {
        this.uMDepart = res.data;
      }
    },
    async getUMRole() {
      const res = await this.$upms.getCurrUserManageRoles();
      if (res) {
        this.uMRole = res.data;
      }
    },
    changebeDepart(list) {
      this.addData.maDepart = this.addData.maDepart.filter(item => {
        return list.includes(item);
      });
    },
    changeUserRole(list) {
      this.addData.asRole = this.addData.asRole.filter(item => {
        return list.includes(item);
      });
    }
  }
};
</script>
<style scoped>
* >>> .el-select__tags-text {
  color: #333;
}
</style>
