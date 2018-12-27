<template>
  <div class="outer-box">
    <div v-if="!pageType">
      <operBar :navs="['权限管理','后台管理']" />
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <el-button type="primary" @click="pageType=1">添加后台</el-button>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="后台名称"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select filterable v-model="depart">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in userInfo.manageDEPTs" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @mod="modShow" @search="search"></Table>
    </div>
    <Add v-if="pageType===1" :roles="roles" @search="search" @close="pageType=0"></Add>
    <Mod v-if="pageType===2" @search="search" @close="pageType=0" :rowData="rowData"></Mod>
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
      text: "",
      depart: "",
      total: 0,
      currentPage: 1,
      loading: false,
      pageType: 0,
      rowData: {},
      roles: []
    };
  },
  components: {
    Table,
    Add,
    Mod
  },
  created() {
    this.search();
    this.getRoles();
  },
  methods: {
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = `?pageNum=${pageNum}&pageSize=20&departmentId=${
        this.depart
      }&backgroundName=${this.text}`;
      const res = await this.$upms.getBack(param);
      this.tableData = res.data.rows;
      this.tableData.forEach(item => {
        if (item.createTime) {
          item.createTime = item.createTime.replace("T", " ");
        }
      });
      this.total = res.data.totalCount;
      this.loading = false;
    },
    async getRoles() {
      const res = await this.$upms.getBgRoles();
      if (res) {
        this.roles = res.data;
      }
    },
    modShow(data) {
      this.rowData = data;
      this.pageType = 2;
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
