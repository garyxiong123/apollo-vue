<template>
    <div class="box">
        <operBar :navs="['包发布管理','渠道管理']" />
        <div style="text-align:left;margin-top:10px;">
            <el-form inline>
                <el-form-item>
                    <el-button @click="$router.push('/packagePut/channel/add')" type="primary">新增</el-button>
                </el-form-item>
                <el-form-item label="包名">
                    <el-select @change="search()" v-model="params.packagVersionId  ">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,id) in allPackage" :key="id" :label="item" :value="id|toNum"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本">
                    <el-select @change="search()" v-model="params.version">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in allVersion" :key="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div @keydown.enter="search()">
                        <el-input style="width:310px" clearable suffix-icon="el-icon-search" placeholder="请输入包名/渠道名/版本号/source等关键词"></el-input>
                    </div>
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
        version: "",
        packagVersionId: ""
      },
      allVersion: [],
      allPackage: {},
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
    const version = this.$route.query.version;
    if (version) {
      this.$set(this.params, "version", version);
    }
    this.init();
  },
  methods: {
    init() {
      this.getAllVersion();
      this.getAllPackage();
      this.search();
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
      const res = await this.$base.getPackageChannelList(param);
      if (res) {
        this.tableData = res.data.rows;
        this.loading = false;
      }
    },
    async getAllVersion() {
      const res = await this.$base.getAllPackageVersion();
      if (res) {
        this.allVersion = res.data;
      }
    },
    async getAllPackage() {
      const res = await this.$base.getAllPackageInfo();
      if (res) {
        this.allPackage = res.data;
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