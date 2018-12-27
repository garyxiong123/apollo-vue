<template>
  <div>
    <el-upload
      action=" "
      :auto-upload="false"
      :on-remove="rmFile"
      :on-change="changeFile"
      :file-list="fileList"
      accept="text/plain"
    >
      <el-button icon="el-icon-upload" circle></el-button>
    </el-upload>
  </div>
</template>
<script>
import { ObjToFormData } from "@/util";
export default {
  data() {
    return {
      fileList: [],
      loading: false
    };
  },
  methods: {
    changeFile(file, fileList) {
      this.fileList = [file];
      this.submit();
    },
    rmFile() {
      this.fileList = [];
      this.$emit("input", "");
    },
    async submit() {
      this.loading = true;
      const res = await this.$base.importDeviceOrUser(
        ObjToFormData({ uploadFile: this.fileList[0].raw })
      );
      this.loading = false;
      if (res) {
        this.$emit("input", res.data.uploadCode);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  text-align: left;
}
</style>