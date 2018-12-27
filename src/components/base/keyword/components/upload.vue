<template>
  <el-dialog class="dialog" title="批量上传" @close="close" :visible.sync="getUploadShow" width="500px">
    <el-form ref="upForm" :model="form" :rules="rule" label-width="90px">
        <el-form-item prop="businessCode" label="平台">
          <el-select filterable v-model="form.businessCode">
            <el-option v-for="item in businessArr" :key="item.businessCode" :label="item.businessInfo" :value="item.businessCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-upload accept="text/plain" style="display:inline-block;vertical-align: top;" action=" " :auto-upload="false" :on-remove="rmFile" :on-change="changeFile" :file-list="fileList">
            <el-button type="warning">上传</el-button>
          </el-upload>
          <el-alert :closable="false" style="height:38px;margin-top:7px;" title="请上传txt类型文件,编码格式为UTF-8" type="warning"></el-alert>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSure">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      form: {},
      rule: {
        businessCode: [{ required: true, message: "必选", trigger: "change" }]
      },
      getUploadShow: false
    };
  },
  props: {
    businessArr: Array,
    uploadShow: Boolean
  },
  watch: {
    uploadShow() {
      this.getUploadShow = this.uploadShow;
    }
  },
  methods: {
    changeFile(file, fileList) {
      this.fileList = [file];
    },
    rmFile() {
      this.fileList = [];
    },
    handleSure() {
      this.$refs["upForm"].validate(valid => {
        if (valid) {
          if (this.fileList.length) {
            this.runUpload();
          } else {
            this.$message({
              type: "warning",
              message: "至少上传一个文件"
            });
          }
        }
      });
    },
    async runUpload() {
      const fd = new FormData();
      fd.append("file", this.fileList[0].raw);
      const res = await this.$base.addKeyListByTxt(fd, this.form.businessCode);
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
