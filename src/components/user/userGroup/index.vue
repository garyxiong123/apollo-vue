<template>
  <div class="outer-box">
    <div v-if="!pageType">
      <operBar :navs="['用户管理','角色管理']" />
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <el-button type="primary" @click="addShow">添加角色</el-button>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="角色名称"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="权限范围">
            <el-select v-model="scope">
              <el-option label="全部" value=""></el-option>
              <el-option label="所有数据" :value="1"></el-option>
              <el-option label="公司全部数据" :value="2"></el-option>
              <el-option label="所选后台全部数据" :value="3"></el-option>
              <el-option label="个人数据" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @showMod="showMod" @search="search"></Table>
    </div>
    <Add @search="search" :canAssignObj="canAssignObj" v-if="pageType===1" @close="pageType=0"></Add>
    <Mod @search="search" :modDataO="modData" v-if="pageType===2" @close="pageType=0"></Mod>
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
      allBack: [],
      scope: "",
      text: "",
      total: 0,
      canAssignObj: {},
      modData: {},
      currentPage: 1,
      loading: false,
      authTree: {},
      okLoading: false,
      pageType: 0
    };
  },
  components: {
    Table,
    Add,
    Mod
  },
  created() {
    this.search();
  },
  methods: {
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = `?pageNum=${pageNum}&pageSize=20&roleName=${
        this.text
      }&scope=${this.scope}`;
      const res = await this.$users.getRole(param);
      this.tableData = res.data.rows;
      this.tableData.forEach(item => {
        if (item.createTime)
          item.createTime = item.createTime.replace("T", " ");
      });
      this.total = res.data.totalCount;
      this.loading = false;
    },
    async addShow() {
      const res = await this.$users.getRoleAssignInfo();
      if (res) {
        this.canAssignObj = res.data;
        this.pageType = 1;
      }
    },
    async showMod(id) {
      const res = await this.$users.getRoleById(id);
      if (res) {
        this.modData = res.data;
        this.pageType = 2;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/common.scss";
.el-checkbox {
  margin-left: 0 !important;
}
</style>
