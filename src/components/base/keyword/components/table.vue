<template>
  <div class="table-box">
    <el-table ref="multipleTable" v-loading="loading" @selection-change="handleSelectionChange" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
      <el-table-column type="selection" width="70">
      </el-table-column>
      <el-table-column prop="id" label="Id" min-width="150">
      </el-table-column>
      <el-table-column prop="sensitiveKey" label="关键词" min-width="300">
      </el-table-column>
      <el-table-column prop="businessInfo" label="平台" min-width="200">
      </el-table-column>
      <el-table-column label="创建时间" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.createTime|formateTime}}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pag :total="total" :current="currentPage" @change="changePage" />
  </div>
</template>
<script>
import Com from "@/common/common";
export default {
  data() {
    return {
      tableMaxHeight: 0
    };
  },
  props: {
    tableData: Array,
    total: Number,
    currentPage: Number,
    loading: Boolean
  },
  filters: {
    formateTime(text) {
      if (text) {
        const tArr = text.split("T");
        const dotArr = tArr[1].split(".");
        return tArr[0] + " " + dotArr[0];
      } else {
        return " ";
      }
    }
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
    editShow(data) {
      this.$emit("mod", data);
    },
    handleSelectionChange(arr) {
      this.$emit("setSelArr", arr);
    },
    clearSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    del(data) {
      this.$confirm(`确定删除该后台么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun(data.id);
      });
    },
    async delRun(id) {
      const res = await this.$upms.delBack(id);
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
@import "../../../../common/table.scss";
.auth-box {
  display: flex;
  padding-top: 30px;
}
.auth-desc {
  width: 200px;
  text-align: left;
  .auth-desc-title {
    color: #2e2e2e;
    font-weight: 600;
  }
  .auth-desc-con {
    font-size: 14px;
    line-height: 1.428571429;
    color: #2e2e2e;
  }
}
.auth-form {
  margin-left: 100px;
  padding: 20px;
  text-align: left;
}
.auth-oper-bar {
  text-align: right;
}
</style>
