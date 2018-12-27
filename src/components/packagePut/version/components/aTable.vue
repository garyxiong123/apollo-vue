<template>
  <div class="table-box">
    <el-table v-loading="loading" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
      <el-table-column prop="packageName" label="包名" min-width="200">
      </el-table-column>
      <el-table-column prop="version" label="版本号" min-width="200">
      </el-table-column>
      <el-table-column prop="deviceTypeName" label="设备类型" min-width="200">
      </el-table-column>
      <el-table-column prop="statusName" label="启禁用" min-width="200">
      </el-table-column>
      <el-table-column prop="packageTypeName" label="包类型" min-width="200">
      </el-table-column>
      <el-table-column prop="packagePath" label="包路径" min-width="150">
      </el-table-column>
      <el-table-column prop="type" label="渠道管理" min-width="150">
         <template slot-scope="scope">
           <el-button @click="toChannel(scope.row)" type="primary">{{`渠道(${scope.row.channelNum})`}}</el-button>
         </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button @click.native.prevent="toEdit(scope.row)" type="text" size="small">
            编辑
          </el-button>
           <el-button style="color:red" @click.native.prevent="del(scope.row)" type="text" size="small">
            删除
          </el-button>
          <el-button @click.native.prevent="changeState(scope.row)" type="text" size="small">
            启禁用
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
    toEdit(data) {
      sessionStorage.setItem("nowVersion", JSON.stringify(data));
      this.$router.push("/packagePut/version/edit");
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
    changeState(data) {
      this.$confirm(`确定${data.status === 1 ? "禁用" : "启用"}么?`, "状态", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.operRun(data);
      });
    },
    async operRun(data) {
      if (data.status === 1) {
        const res = await this.$base.stopPackageVersion(data.id);
        if (res) {
          this.operResult();
        }
      } else {
        const res = await this.$base.startPackageVersion(data.id);
        if (res) {
          this.operResult();
        }
      }
    },
    operResult() {
      this.$message({
        type: "success",
        message: "操作成功!"
      });
      this.$emit("search");
    },
    async delRun(id) {
      const res = await this.$base.delPackageVersion(id);
      if (res) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$emit("search");
      }
    },
    toChannel(data) {
      this.$router.push({
        path: "/packagePut/channel",
        query: { version: data.version }
      });
      this.$parent.$parent.$children.forEach(item => {
        if (item.menus) {
          item.setDefault();
        }
      });
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
