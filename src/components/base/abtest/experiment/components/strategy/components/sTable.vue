<template>
  <div>
    <div class="table-box">
      <el-table
        v-loading="loading"
        :style="{border:'1px solid #ebeef5'}"
        :data="tableData"
        :max-height="tableMaxHeight"
      >
        <el-table-column prop="strategyName" label="策略名" min-width="200"></el-table-column>
        <el-table-column prop="strategyKey" label="key" min-width="200"></el-table-column>
        <el-table-column prop="description" label="描述" min-width="200"></el-table-column>
        <el-table-column prop="strategyRule" label="规则" min-width="200"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="200">
          <template slot-scope="scope">
            <span :style="{color:scope.row.status?'red':'green'}">{{scope.row.status?'关闭':'开启'}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button @click.native.prevent="mod(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              v-if="scope.row.status"
              @click.native.prevent="changeStatus(scope.row)"
              type="text"
              size="small"
            >开始策略</el-button>
            <el-button
              v-else
              style="color:red"
              @click.native.prevent="changeStatus(scope.row)"
              type="text"
              size="small"
            >结束策略</el-button>
            <el-button
              style="color:red"
              @click.native.prevent="del(scope.row)"
              type="text"
              size="small"
            >删除</el-button>
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
      okLoading: false,
      experimentId: this.$route.query.experimentId
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
  methods: {
    changePage(current) {
      this.$emit("search", current);
    },
    mod(data) {
      sessionStorage.setItem("strategyData", JSON.stringify(data));
      this.$router.push({
        path: "/base/abtest/experiment/strategy/mod",
        query: {
          experimentId: this.experimentId,
          strategyType: this.$route.query.strategyType
        }
      });
    },
    changeStatus(data) {
      this.$confirm(`确定${data.status ? "开启" : "关闭"}么?`, "状态", {
        confirmButtonText: data.status ? "开启" : "关闭",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (data.status) {
          this.openStrategy(data.id);
        } else {
          this.endStrategy(data.id);
        }
      });
    },
    async openStrategy(id) {
      const res = await this.$base.openStrategy(id);
      if (res) {
        this.$message({
          type: "success",
          message: "开启成功!"
        });
        this.$emit("search");
      }
    },
    async endStrategy(id) {
      const res = await this.$base.endStrategy(id);
      if (res) {
        this.$message({
          type: "success",
          message: "关闭成功!"
        });
        this.$emit("search");
      }
    },
    del(data) {
      this.$confirm(`确定删除该项么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun(data.id);
      });
    },
    async delRun(id) {
      const res = await this.$base.delStrategy(id);
      if (res) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$emit("search");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../../../common/table.scss";
</style>