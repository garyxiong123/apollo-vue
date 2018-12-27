<template>
  <div class="table-box">
    <el-table v-loading="loading" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
      <el-table-column prop="apppName" label="app" min-width="200">
      </el-table-column>
      <el-table-column prop="subject" label="主题" min-width="150">
      </el-table-column>
      <el-table-column prop="customTag" label="标签" min-width="250">
      </el-table-column>
      <el-table-column prop="fromUser" label="发送人" min-width="250">
      </el-table-column>
      <el-table-column prop="toUser" label="接收人" min-width="250">
      </el-table-column>
      <el-table-column prop="sendTimeEnd" label="发送时间" min-width="250">
      </el-table-column>
      <!-- <el-table-column label="备注" min-width="300">
        <template slot-scope="scope">
          <el-popover placement="top" width="200" trigger="click" :content="tableData[scope.$index].remark">
            <el-button slot="reference" type="text">{{tableData[scope.$index].remark?(tableData[scope.$index].remark.length>20?(tableData[scope.$index].remark.slice(0,20)+'...'):tableData[scope.$index].remark):''}}</el-button>
          </el-popover>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="$router.push('/base/email/detail')" type="text" size="small">
            详情
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
    editShow(data) {
      this.$emit("mod", data);
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
