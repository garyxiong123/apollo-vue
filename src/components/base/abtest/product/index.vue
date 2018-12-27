<template>
  <div v-loading="loading" class="outer-box">
    <operBar :navs="['abtest','用户产品管理']"/>
    <PTable @search="search" :tableData="tableData"></PTable>
  </div>
</template>
<script>
import PTable from "./components/pTable";
export default {
  data() {
    return {
      text: "",
      tableData: [],
      loading: false
    };
  },
  components: {
    PTable
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      this.loading = true;
      const res = await this.$base.getUserProduct();
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
