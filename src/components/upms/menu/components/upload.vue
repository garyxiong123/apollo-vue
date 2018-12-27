<template>
  <el-dialog class="dialog" title="批量上传" @close="close" :visible.sync="getUploadShow" width="400px">
    <el-upload style="display:inline-block;vertical-align: top;" action=" " :auto-upload="false" :on-remove="rmFile" :on-change="changeFile" :file-list="fileList">
      <el-button type="warning">上传</el-button>
    </el-upload>
    <el-button style="float:right" @click="downloadMock" type="text">下载模板</el-button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSure">上 传</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      getUploadShow: false
    };
  },
  props: {
    uploadShow: Boolean
  },
  watch: {
    uploadShow() {
      this.getUploadShow = this.uploadShow;
    }
  },
  methods: {
    async downloadMock() {
      const res = await this.$upms.downloadMock();
    },
    changeFile(file, fileList) {
      this.fileList = [file];
    },
    rmFile() {
      this.fileList = [];
    },
    handleSure() {
      if (this.fileList.length) {
        this.runUpload();
      } else {
        this.$message({
          type: "warning",
          message: "至少上传一个文件"
        });
      }
    },
    async runUpload() {
      const fd = new FormData();
      fd.append("file", this.fileList[0].raw);
      const res = await this.$upms.uploadMenu(fd);
      if (res) {
        this.$message({
          type: "success",
          message: "上传成功"
        });
        this.$emit("close");
        this.$emit("search");
      }
    },
    close() {
      this.fileList = [];
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  text-align: left;
}
</style>
