<template>
  <div v-loading="loading" class="outer-box">
    <operBar :navs="['返回上级','abtest','实验','策略管理']"/>
    <div style="margin-top:10px;">
      <el-button @click="addShow" type="primary">添加策略</el-button>
    </div>
    <STable @search="search" :tableData="tableData"></STable>
  </div>
</template>
<script>
import STable from "./components/sTable";
import { ObjToFormData } from "@/util";
export default {
  data() {
    return {
      text: "",
      loading: false,
      tableData: [],
      experimentId: this.$route.query.experimentId
    };
  },
  components: {
    STable
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.search();
    },
    addShow() {
      this.$router.push({
        path: "/base/abtest/experiment/strategy/add",
        query: {
          experimentId: this.experimentId,
          strategyType: this.$route.query.strategyType
        }
      });
    },
    async search() {
      this.loading = true;
      const res = await this.$base.manageStrategy(
        ObjToFormData({ experimentId: this.experimentId })
      );
      this.loading = false;
      if (res) {
        this.tableData = res.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../../common/common.scss";
</style>
