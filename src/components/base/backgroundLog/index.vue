<template>
  <div class="outer-box">
    <div>
      <operBar :navs="['基础能力','后台操作日志']" />
      <!-- <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="发件人"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="收件人"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="标签"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @mod="modShow" @search="search"></Table> -->
    </div>
  </div>
</template>
<script>
import Table from "./components/table";
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
    Table
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
