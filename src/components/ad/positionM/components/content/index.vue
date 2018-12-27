<template>
    <div>
        <el-button @click="$router.push({path:'/ad/positionM'})" type="text">返回上级</el-button>
        <span style="color:#333;font-size:14px">推荐位内容</span>
        <div style="text-align:left;margin-top:10px;">
            <el-form inline>
                <el-form-item>
                    <el-button @click="$router.push({path:'/ad/positionM/content/add',query:{positionId:$route.query.positionId}})" type="primary">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <div @keydown.enter="search()">
                        <el-input v-model="expand" clearable suffix-icon="el-icon-search" placeholder="请输入"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                </el-form-item>
            </el-form>
            <CTable :loading="loading" :tableData="tableData" @search="search" />
        </div>
    </div>
</template>
<script>
import CTable from "./components/cTable";
export default {
  data() {
    return {
      positionId: "",
      expand: "",
      tableData: [],
      total: 0,
      currentPage: 1,
      loading: false
    };
  },
  components: {
    CTable
  },
  created() {
    this.positionId = this.$route.query.positionId;
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.search();
    },
    async search() {
      this.loading = true;
      const res = await this.$base.getPositionContentsByPositionId({
        positionId: this.positionId,
        expand: this.expand
      });
      if (res) {
        this.tableData = res.data;
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
