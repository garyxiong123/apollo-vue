<template>
  <formPage descTitle="修改用户" @ok="handleSure" @cancel="$emit('close')">
    <el-form ref="modForm" :model="modData" :rules="rules" label-width="90px">
      <el-form-item prop="username" label="用户名">
        <el-input disabled v-model="modData.username"></el-input>
      </el-form-item>
      <el-form-item prop="realName" label="真实姓名">
        <el-input v-model="modData.realName"></el-input>
      </el-form-item>
      <el-form-item label="所属公司">
        <el-select filterable v-model="modData.companyId" @change="resetDepart">
          <el-option v-for="item in allCom" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="be-depart" :prop="modData.companyId==10001?'beDepart':''" label="所属部门">
        <span v-if="modData.companyId==10001" class="d-dot">*</span>
        <el-select disabled filterable multiple @change="modData.maDepart=[]" v-model="modData.beDepart">
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button @click="showDia" type="text">选择</el-button>
        <div v-if="modData.companyId==10001?showV:false" style="line-height:1px;margin-top:8px;margin-left:3px">
          <span style="color: #f56c6c;font-size: 12px;">必选</span>
        </div>
      </el-form-item>
      <el-dialog title="所属部门" :visible.sync="treeDialogShow" width="500px">
        <el-tree ref="tree" :data="allDep" check-strictly auto-expand-parent :default-expanded-keys="modData.beDepart" show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="selDepart">确 定</el-button>
        </span>
      </el-dialog>
      <el-tree v-show="false" ref="tree2" :data="allDep" check-strictly show-checkbox node-key="id" :props="defaultProps">
      </el-tree>
      <el-form-item label="管理部门">
        <el-select filterable multiple v-model="modData.maDepart">
          <el-option v-for="item in selDep" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="modData.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input disabled v-model="modData.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="modData.phone"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="modData.state">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="未激活" :value="4"></el-option>
          <el-option label="禁用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="role" label="用户角色">
        <el-select @change="modData.asRole=[]" filterable multiple v-model="modData.role">
          <el-option v-for="item in uMRole" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可分配角色">
        <el-select filterable multiple v-model="modData.asRole">
          <el-option v-for="item in setAsRole" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="modData.remark" type="textarea" rows="4"></el-input>
      </el-form-item>
    </el-form>
  </formPage>
</template>
<script>
import rules from "@/common/rules";
export default {
  data() {
    return {
      modData: {},
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
    allCom: Array,
    modDataO: Object
  },
  computed: {
    setBeDepa() {
      return this.uMDepart.filter(item => {
        return item.parentCompany.id === this.modData.companyId;
      });
    },
    setMDepa() {
      return this.uMDepart.filter(item => {
        if (this.modData.beDepart) {
          return this.modData.beDepart.indexOf(item.id) !== -1;
        } else {
          return false;
        }
      });
    },
    setAsRole() {
      return this.uMRole.filter(item => {
        if (this.modData.role) {
          return this.modData.role.indexOf(item.id) !== -1;
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.modData = JSON.parse(JSON.stringify(this.modDataO));
    this.setDefault();
    this.getDep(this.modData.companyId);
    this.getSelDep();
    this.getUMDepart();
    this.getUMRole();
  },
  methods: {
    setDefault() {
      this.$set(
        this.modData,
        "beDepart",
        this.modData.belongDEPTs.map(item => item.id)
      );
      this.$set(
        this.modData,
        "maDepart",
        this.modData.manageDEPTs.map(item => item.id)
      );
      this.$set(
        this.modData,
        "role",
        this.modData.hasRoles.map(item => item.id)
      );
      this.$set(
        this.modData,
        "asRole",
        this.modData.manageRoles.map(item => item.id)
      );
    },
    handleSure() {
      this.$refs["modForm"].validate(valid => {
        if (this.modData.beDepart.length || this.modData.companyId != 10001) {
          this.showV = false;
          if (valid) {
            this.makeData();
            this.runmod();
          }
        } else {
          this.showV = true;
        }
      });
    },
    resetDepart(id) {
      this.getDep(id);
      this.$set(this.modData, "beDepart", []);
      this.$set(this.modData, "maDepart", []);
    },
    makeData() {
      const modData = JSON.parse(JSON.stringify(this.modData));
      modData.beDepart = modData.beDepart.filter(item => {
        return modData.maDepart.indexOf(item) === -1;
      });
      modData.role = modData.role.filter(item => {
        return modData.asRole.indexOf(item) === -1;
      });
      const de1 = modData.beDepart.map(item => {
        return {
          organizationId: item,
          manageable: false
        };
      });
      const de2 = modData.maDepart.map(item => {
        return {
          organizationId: item,
          manageable: true
        };
      });
      const ro1 = modData.role.map(item => {
        return {
          roleId: item,
          assignable: false
        };
      });
      const ro2 = modData.asRole.map(item => {
        return {
          roleId: item,
          assignable: true
        };
      });
      this.modData.userOrganizations = de1.concat(de2);

      this.modData.userRoles = ro1.concat(ro2);
    },
    async runmod() {
      const data = JSON.parse(JSON.stringify(this.modData));
      delete data.createTime;
      delete data.updateTime;
      delete data.createAuthor;
      delete data.updateAuthor;
      const res = await this.$users.updateUser(data);
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
      this.modData.beDepart = arr.map(item => item.id);
      this.treeDialogShow = false;
      this.modData.maDepart = [];
    },
    getSelDep() {
      this.selDep = this.modData.belongDEPTs;
    },
    async getDep(id) {
      const res = await this.$users.getDepByComId(id);
      if (res) {
        this.allDep = res.data;
      }
    },
    showDia() {
      this.treeDialogShow = true;
      setTimeout(() => {
        this.$refs["tree"].setCheckedKeys(this.modData.beDepart);
      }, 0);
    },
    async getUMDepart() {
      const res = await this.$users.getCurrUserManageDepts();
      if (res) {
        this.uMDepart = res.data;
      }
    },
    async getUMRole() {
      const res = await this.$users.getCurrUserManageRoles();
      if (res) {
        this.uMRole = res.data;
      }
    }
  }
};
</script>
<style lang="css" scoped>
.d-dot {
  color: #f56c6c;
  position: absolute;
  top: 0;
  left: -78px;
}
</style>
