<template>
  <div class="table-box">
    <el-table v-loading="loading" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
      <el-table-column prop="name" label="组" min-width="200">
      </el-table-column>
      <el-table-column prop="name" label="模块键" min-width="200">
      </el-table-column>
      <el-table-column prop="title" label="模块值" min-width="200">
      </el-table-column>
      <el-table-column prop="group" label="模块描述" min-width="200">
      </el-table-column>
      <el-table-column prop="name" label="操作人员" min-width="200">
      </el-table-column>
      <el-table-column prop="type" label="状态" min-width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button @click.native.prevent="$router.push('/packagePut/moduleConfig/edit')" type="text" size="small">
            编辑
          </el-button>
           <el-button @click.native.prevent="del(scope.row)" type="text" size="small">
            删除
          </el-button>
          <el-button style="color:red" @click.native.prevent="changeState(scope.row)" type="text" size="small">
            启用
          </el-button>
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
    del(data) {
      this.$confirm(`确定删除该项么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // this.delRun(data.id);
      });
    },
    changeState(data) {
      this.$confirm(`确定么?`, "状态", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // this.delRun(data.id);
      });
    },
    async delRun(id) {
      const res = await this.$users.delMenu(id);
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
