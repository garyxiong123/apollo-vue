<template>
  <div class="outer-box">
    <div>
      <operBar :navs="['基础能力','中台邮件管理']" />
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="params.fromUser" suffix-icon="el-icon-search" placeholder="发件人"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="params.toUser" suffix-icon="el-icon-search" placeholder="收件人"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="params.customTag" suffix-icon="el-icon-search" placeholder="标签"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @search="search"></Table>
    </div>
  </div>
</template>
<script>
import Table from "./components/table";
export default {
  data() {
    return {
      tableData: [],
      params: {},
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      total: 0,
      currentPage: 1,
      loading: false
    };
  },
  components: {
    Table
  },
  created() {
    this.search();
  },
  methods: {
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = Object.assign(
        {
          page: pageNum,
          size: 20
        },
        this.params
      );
      const res = await this.$base.getMailList(param);
      if (res) {
        this.tableData = res.data.rows;
        // this.tableData.forEach(item => {
        //   if (item.createTime) {
        //     item.createTime = item.createTime.replace("T", " ");
        //   }
        // });
        this.total = res.data.totalCount;
      }
      this.loading = false;
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
