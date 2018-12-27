<template>
  <div class="outer-box">
    <div v-if="!pageType">
      <operBar :navs="['用户管理','用户列表']" />
      <div style="text-align:left;margin-top:10px">
        <el-form inline>
          <el-button type="primary" @click="pageType=1">添加用户</el-button>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="账号/姓名/手机号搜索"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="所属角色">
            <el-select filterable v-model="role">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in userInfo.manageRoles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select filterable v-model="dept">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in userInfo.manageDEPTs" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select v-model="state">
              <el-option label="全部" value=""></el-option>
              <el-option label="激活" :value="1"></el-option>
              <el-option label="未激活" :value="4"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
        </el-form>
      </div>
      <Table :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @mod="mod" @search="search"></Table>
    </div>
    <Add v-if="pageType===1" :allCom="allCom" @search="search()" @close="pageType=0"></Add>
    <Mod v-if="pageType===2" :modDataO="modData" :allCom="allCom" @search="search()" @close="pageType=0"></Mod>
  </div>
</template>
<script>
import Table from "./components/table";
import Add from "./components/add";
import Mod from "./components/mod";
export default {
  data() {
    return {
      tableData: [],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      role: "",
      state: "",
      dept: "",
      text: "",
      total: 0,
      currentPage: 1,
      pageType: 0,
      loading: false,
      allCom: [],
      modData: {}
    };
  },
  components: {
    Table,
    Add,
    Mod
  },
  created() {
    this.search();
    this.getAllCom();
  },
  methods: {
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = {
        pageNum,
        pageSize: 20,
        queryStr: this.text,
        roleId: this.role,
        deptId: this.dept,
        state: this.state
      };
      for (let item in param) {
        if (!param[item] && param[item] !== 0) {
          delete param[item];
        }
      }
      const res = await this.$users.getUsersByPage(param);
      this.tableData = res.data.rows;
      this.tableData.forEach(item => {
        if (item.createTime) {
          item.createTime = item.createTime.replace("T", " ");
        }
      });
      this.total = res.data.totalCount;
      this.loading = false;
    },
    async getAllCom() {
      const res = await this.$users.getAllOrg();
      if (res) {
        this.allCom = res.data;
      }
    },
    mod(data) {
      this.modData = data;
      this.pageType = 2;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/common.scss";
</style>
