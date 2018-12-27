<template>
  <div>
    <el-upload action=" " :auto-upload="false" :on-remove="rmFile" :on-change="changeFile" :file-list="fileList">
      <el-button icon="el-icon-upload" circle></el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    changeFile(file, fileList) {
      this.fileList = [file];
       this.$emit('input',file.raw);
    },
    rmFile() {
      this.fileList = [];
       this.$emit('input','');
    },
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  text-align: left;
}
</style>
