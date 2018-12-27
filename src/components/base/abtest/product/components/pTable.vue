<template>
  <div>
    <div class="table-box">
      <el-table
        v-loading="loading"
        :style="{border:'1px solid #ebeef5'}"
        :data="tableData"
        :max-height="tableMaxHeight"
      >
        <el-table-column prop="username" label="用户名" min-width="300"></el-table-column>
        <el-table-column prop="pro" label="产品" min-width="500">
          <template slot-scope="scope">
            <span>{{scope.row.products.map(item=>{return item.productName}).join(',')}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button @click.native.prevent="mod(scope.row)" type="text" size="small">编辑</el-button>
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
import { ObjToFormData } from "@/util";
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
  methods: {
    changePage(current) {
      this.$emit("search", current);
    },
    mod(data) {
      sessionStorage.setItem("abtestUserProduct", JSON.stringify(data));
      this.$router.push("/base/abtest/product/mod");
    },
    del(data) {
      this.$confirm(`确定删除该项么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun(data.userId);
      });
    },
    async delRun(userId) {
      const res = await this.$base.delUserProduct(ObjToFormData({ userId }));
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
@import "../../../../../common/table.scss";
</style>