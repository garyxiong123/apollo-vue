<template>
  <div class="table-box">
    <el-table v-loading="loading" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
      <el-table-column prop="id" label="序号" min-width="80">
      </el-table-column>
      <el-table-column label="文件路径" min-width="300">
        <template slot-scope="scope">
          <el-popover placement="top" width="200" trigger="click" :content="scope.row.folderPath">
            <el-button slot="reference" type="text">{{scope.row.folderPath?(scope.row.folderPath.length>30?(scope.row.folderPath.slice(0,30)+'...'):scope.row.folderPath):''}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="appName" label="应用名称" min-width="150">
      </el-table-column>
      <el-table-column prop="bucketName" label="存储桶名称" min-width="200">
      </el-table-column>
      <el-table-column prop="cannedAccessControlList" label="访问控制" min-width="150">
      </el-table-column>
      <el-table-column prop="storageClass" label="存储策略" min-width="200">
      </el-table-column>
      <el-table-column prop="storageServer" label="存储服务" min-width="150">
      </el-table-column>
      <el-table-column prop="originalFilename" label="原文件名" min-width="200">
      </el-table-column>
      <el-table-column prop="objectKey" label="服务中的文件名" min-width="200">
      </el-table-column>
      <el-table-column prop="fileSize" label="文件大小" min-width="150">
      </el-table-column>
      <el-table-column prop="customTag" label="自定义标签" min-width="150">
      </el-table-column>
      <el-table-column label="保存时间" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.createTime|formatTime}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="downLoadFile(scope.row.fileUrl)" type="text" size="small">
            下载文件
          </el-button>
        </template>
      </el-table-column> -->
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
    formatTime(text) {
      return text ? text.replace("T", " ") : " ";
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
    downLoadFile(url) {
      window.open(url);
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
