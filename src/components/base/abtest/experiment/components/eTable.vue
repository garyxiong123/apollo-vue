<template>
  <div>
    <div class="table-box">
      <el-table
        v-loading="loading"
        :style="{border:'1px solid #ebeef5'}"
        :data="tableData"
        :max-height="tableMaxHeight"
      >
        <el-table-column prop="experimentName" label="实验名" min-width="200"></el-table-column>
        <el-table-column prop="experimentKey" label="key" min-width="200"></el-table-column>
        <el-table-column prop="description" label="描述" min-width="200"></el-table-column>
        <el-table-column prop="createTime" label="添加时间" min-width="200"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="200"></el-table-column>
        <el-table-column prop="strategyType" label="策略类型" min-width="200">
          <template slot-scope="scope">{{scope.row.strategyType|getStrategyType}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button @click.native.prevent="mod(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="strategy(scope.row)" type="text" size="small">策略管理</el-button>
            <el-button
              v-if="!scope.row.isEnd"
              style="color:red"
              @click.native.prevent="del(scope.row)"
              type="text"
              size="small"
            >结束实验</el-button>
            <el-button type="text" size="small" style="color:#ababab" disabled v-else>已结束</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pag :total="total" :current="currentPage" @change="changePage"/>
    </div>
  </div>
</template>
<script>
import Com from "@/common/common";
export default {
  data() {
    return {
      tableMaxHeight: 0,
      okLoading: false
    };
  },
  props: {
    tableData: Array,
    total: Number,
    currentPage: Number,
    loading: Boolean
  },
  created() {
    Com.watchHeight(this);
  },
  destroyed() {
    Com.removeWatchHeight(this);
  },
  filters: {
    getStrategyType(code) {
      return code == 1 ? "百分比" : code == 2 ? "指定设备" : "指定用户";
    }
  },
  methods: {
    changePage(current) {
      this.$emit("search", current);
    },
    mod(data) {
      sessionStorage.setItem("abtestExp", JSON.stringify(data));
      this.$router.push("/base/abtest/experiment/mod");
    },
    strategy(data) {
      this.$router.push({
        path: "/base/abtest/experiment/strategy",
        query: {
          experimentId: data.id,
          strategyType: data.strategyType
        }
      });
    },
    del(data) {
      this.$confirm(`确定结束该实验么?`, "结束实验", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun(data.id);
      });
    },
    async delRun(id) {
      const res = await this.$base.endExperiment(id);
      if (res) {
        this.$message({
          type: "success",
          message: "结束实验成功!"
        });
        this.$emit("search");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../common/table.scss";
</style>