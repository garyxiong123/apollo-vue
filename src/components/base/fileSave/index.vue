<template>
  <div class="outer-box">
    <div>
      <operBar :navs="['基础能力','文件存储管理']"/>
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item label="应用名称">
            <el-select clearable filterable v-model="appName">
              <el-option
                v-for="item in allBack"
                :key="item.id"
                :value="item.code"
                :label="item.backgroundName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存储服务">
            <el-select filterable v-model="form.storageServer">
              <el-option v-for="item in storageServerArr" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="储存策略">
            <el-select filterable v-model="form.storageClass">
              <el-option v-for="item in storageClassArr" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="访问控制">
            <el-select filterable v-model="form.cannedAccessControlList">
              <el-option
                v-for="item in cannedAccessControlListArr"
                :key="item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存储类型">
            <el-select filterable v-model="form.storageType">
              <el-option v-for="item in storageTypeArr" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="dateTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="primary" @click="uploadFile">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table
        :loading="loading"
        :tableData="tableData"
        :total="total"
        :currentPage="currentPage"
        @search="search"
      ></Table>
    </div>
  </div>
</template>
<script>
import Table from "./components/table";
import Com from "@/common/common";
export default {
  data() {
    return {
      form: {},
      storageServerArr:[ 'YouyuFdfs', 'YouyuCephObject', 'TencentCos', 'QiniuStorage' ],
      storageClassArr:[ 'Standard', 'ReducedRedundancy', 'Glacier', 'StandardInfrequentAccess' ],
      cannedAccessControlListArr:[ 'Private', 'PublicRead', 'PublicReadWrite', 'AuthenticatedRead', 'LogDeliveryWrite', 'BucketOwnerRead', 'BucketOwnerFullControl', 'AwsExecRead' ],
      storageTypeArr:[ 'Transient', 'Permanent' ],
      dateTime: [],
      allBack:[],
      appName:'',
      tableData: [],
      total: 0,
      currentPage: 1,
      loading: false
    };
  },
  components: {
    Table
  },
  created() {
    this.search();
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
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = this._.assign(this.form, {});
      if (!this._.isEmpty(this.dateTime)) {
        param.createTimeGreaterThan = this.dateTime[0];
        param.createTimeLessThan = this.dateTime[1];
      }
      param.appNameList=this.appName?[this.appName]:[];
      const res = await this.$base.queryFileUploadList(Com.romoveNullObj(param),pageNum,20);
      this.loading = false;
      if (res) {
        this.tableData = res.data.rows || [];
        this.total = res.data.totalCount;
      }
    },
    uploadFile(){
      this.$router.push("/base/fileSave/addFile");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/common.scss";
.el-checkbox {
  margin-left: 0 !important;
}
</style>
