<template>
  <div class="box">
    <h3>上传文件</h3>
    <el-form ref="addForm" :model="form" :rules="rules" label-width="120px">
      <div style="width:49%;float:left">
        <el-form-item prop="appName" label="应用名称">
          <el-select filterable v-model="form.appName">
            <el-option
              v-for="item in allBack"
              :key="item.id"
              :value="item.code"
              :label="item.backgroundName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="storageServer" label="存储服务">
          <el-select filterable v-model="form.storageServer">
            <el-option v-for="item in storageServerArr" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="file" label="上传文件">
          <Upload v-model="form.file"/>
        </el-form-item>
        <el-form-item prop="objectKey" label="文件名">
          <el-input v-model="form.objectKey" placeholder="服务中的文件名（唯一），留空会自动添加唯一前缀"></el-input>
        </el-form-item>
        <el-form-item prop="folderPath" label="文件夹路径">
          <el-input v-model="form.folderPath"></el-input>
        </el-form-item>
        <el-form-item prop="bucketName" label="存储桶名称">
          <el-input v-model="form.bucketName"></el-input>
        </el-form-item>
        <el-form-item prop="storageClass" label="储存策略">
          <el-select filterable v-model="form.storageClass">
            <el-option v-for="item in storageClassArr" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cannedAccessControlList" label="访问控制">
          <el-select filterable v-model="form.cannedAccessControlList">
            <el-option
              v-for="item in cannedAccessControlListArr"
              :key="item"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="storageType" label="存储类型">
          <el-select filterable v-model="form.storageType">
            <el-option v-for="item in storageTypeArr" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="customTag" label="自定义标签">
          <el-input v-model="form.customTag"></el-input>
        </el-form-item>
      </div>
      <div style="clear:both"></div>
    </el-form>
    <div class="operbar">
      <el-button @click="()=>$router.back()">取消</el-button>
      <el-button :loading="loading" @click="handleSure" type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
import Upload from "./upload";
export default {
  data() {
    return {
      form: {
          storageClass:'StandardInfrequentAccess',
          cannedAccessControlList:'PublicRead',
          storageType:'Transient'
      },
      storageServerArr:[ 'YouyuFdfs', 'YouyuCephObject', 'TencentCos', 'QiniuStorage' ],
      storageClassArr:[ 'Standard', 'ReducedRedundancy', 'Glacier', 'StandardInfrequentAccess' ],
      cannedAccessControlListArr:[ 'Private', 'PublicRead', 'PublicReadWrite', 'AuthenticatedRead', 'LogDeliveryWrite', 'BucketOwnerRead', 'BucketOwnerFullControl', 'AwsExecRead' ],
      storageTypeArr:[ 'Transient', 'Permanent' ],
      rules: {
        appName:[{ required: true, message: "必选", trigger: "change" }],
        storageServer: [{ required: true, message: "必选", trigger: "change" }],
        file:[{required: true, message: "至少上传一个文件", trigger: "change"}],
        bucketName:[{required: true, message: "必填", trigger: "blur"}]
      },
      loading: false,
      allBack:[]
    };
  },
  components: {
    Upload
  },
  created(){
      this.init();
  },
  methods: {
    async init(){
        sessionStorage.setItem('appName','middleBackground');
        const res = await this.$upms.getAllBack();
        if(res){
            this.allBack = res.data;
        }
    },
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
            sessionStorage.setItem('appName',this.form.appName);
            this.runAdd();
        }
      });
    },
    async runAdd() {
      this.loading = true;
      const res = await this.$base.fileSaveUpload(this.form.storageServer,this.makeFormData());
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.back();
      }
    },
    makeFormData(){
        const fd = new FormData();
        const arr = ['file','objectKey','folderPath','bucketName','storageClass','cannedAccessControlList','storageType','customTag']
        arr.forEach(item=>{
            this.appendFd(fd,item,this.form[item]);
        })
        return fd
    },
    appendFd(fd,key,value){
        if(value){
            fd.append(key,value);
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: calc((100vw - 420px) * 0.8);
  min-width: 880px;
  margin: 10px auto;
  padding: 15px;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.operbar {
  text-align: right;
}
</style>