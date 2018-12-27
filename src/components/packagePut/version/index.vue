<template>
    <div class="box">
        <operBar :navs="['包发布管理','版本管理']" />
        <div style="text-align:left;margin-top:10px;">
            <el-form inline>
                <el-form-item>
                    <el-button @click="$router.push('/packagePut/version/add')" type="primary">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-radio-group @change="search()" v-model="params.packageType" size="medium">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button v-for="(item,id) in allType" :key="id" :label="id|toNum">{{item}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="版本">
                    <el-select @change="search()" clearable v-model="params.version">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in allVersion" :key="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <div @keydown.enter="search()">
                        <el-input style="width:270px" clearable suffix-icon="el-icon-search" placeholder="请输入包名/版本号/source等关键词"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search()">查询</el-button>
                </el-form-item>
            </el-form>
            <ATable :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @search="search" />
        </div>
    </div>
</template>
<script>
import ATable from "./components/aTable";
export default {
  data() {
    return {
      params: {
        packageType: "",
        version: ""
      },
      allVersion: [],
      allType: {},
      allDevice: {},
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
      this.getAllVersion();
      this.getDeviceType();
      this.getPackageType();
      this.search();
    },
    async getAllVersion() {
      const res = await this.$base.getAllPackageVersion();
      if (res) {
        this.allVersion = res.data;
      }
    },
    async getDeviceType() {
      const res = await this.$base.getAllDeviceType();
      if (res) {
        this.allDevice = res.data;
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
      const res = await this.$base.getPackageVersionList(param);
      if (res) {
        this.tableData = res.data.rows;
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