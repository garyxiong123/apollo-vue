<template>
  <div v-loading="loading" class="outer-box">
    <operBar :navs="['abtest','实验']"/>
    <div style="margin-top:10px;">
      <el-button @click="$router.push('/base/abtest/experiment/add')" type="primary">添加实验</el-button>
    </div>
    <ETable @search="search" :tableData="tableData"></ETable>
  </div>
</template>
<script>
import ETable from "./components/eTable";
export default {
  data() {
    return {
      text: "",
      tableData: [],
      loading: false
    };
  },
  components: {
    ETable
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      this.loading = true;
      const res = await this.$base.getAllExperiment();
      this.loading = false;
      if (res) {
        this.tableData = res.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/common.scss";
</style>
