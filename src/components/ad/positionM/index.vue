<template>
    <div class="box">
        <operBar :navs="['推荐管理','推荐位管理']" />
        <div style="text-align:left;margin-top:10px;">
            <el-form inline>
                <el-form-item>
                    <el-button @click="$router.push('/ad/positionM/add')" type="primary">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <div @keydown.enter="search()">
                        <el-input style="width:300px;" v-model="params.positionName" clearable suffix-icon="el-icon-search" placeholder="请输入标题/副标题/组/locationKey关键词"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-radio-group @change="search()" v-model="params.positionStatus" size="medium">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,id) in statusData" :key="id" :label="id|toNum">{{item}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-radio-group @change="search()" v-model="params.packageType" size="medium">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,id) in allType" :key="id" :label="id|toNum">{{item}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                </el-form-item>
            </el-form>
            <ATable :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage"@search="search" />
        </div>
    </div>
</template>
<script>
import ATable from "./components/aTable";
export default {
  data() {
    return {
      params: {
        positionStatus: "",
        packageType: ""
      },
      statusData: {},
      allType: {},
      tableData: [],
      total: 0,
      currentPage: 1,
      loading: false
    };
  },
  components: {
    ATable
  },
  filters: {
    toNum(val) {
      return parseInt(val, 10);
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPositionStatus();
      this.getPackageType();
      this.search();
    },
    async getPositionStatus() {
      const res = await this.$base.getPositionStatus();
      if (res) {
        this.statusData = res.data;
      }
    },
    async getPackageType() {
      const res = await this.$base.getAllPackageType();
      if (res) {
        this.allType = res.data;
      }
    },
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = Object.assign(
        {
          pageNum,
          pageSize: 20
        },
        this.params
      );
      const res = await this.$base.getRecommendPositionList(param);
      if (res) {
        this.tableData = res.data.rows;
        this.total = res.data.totalCount;
        this.loading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  padding: 0 10px;
}
</style>
