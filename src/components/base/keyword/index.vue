<template>
  <div class="outer-box">
    <div>
      <operBar :navs="['基础能力','关键字过滤']" />
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <el-button @click="addKeyWordShow=true" type="primary">新增</el-button>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" @click="uploadShow=true">批量上传</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="del" type="danger">{{!selArr.length?'删除':'删除('+selArr.length+')'}}</el-button>
          </el-form-item>
          <el-form-item label="平台">
            <el-select @change="search()" multiple filterable v-model="businessCode">
              <el-option v-for="item in businessArr" :key="item.businessCode" :label="item.businessInfo" :value="item.businessCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchKey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table @setSelArr="setSelArr" :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @search="search"></Table>
    </div>
    <el-dialog class="dialog" title="新增关键字" :visible.sync="addKeyWordShow" width="550px">
      <el-form ref="addForm" :model="form" :rules="rule" label-width="90px">
        <el-form-item prop="businessCode" label="平台">
          <el-select filterable v-model="form.businessCode">
            <el-option v-for="item in businessArr" :key="item.businessCode" :label="item.businessInfo" :value="item.businessCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="keys" label="关键词">
          <el-input style="width:300px" v-model="form.keys"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addKeyWordShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">提 交</el-button>
      </span>
    </el-dialog>
    <Upload @search="search" :businessArr="businessArr" @close="uploadShow=false" :uploadShow="uploadShow"></Upload>
  </div>
</template>
<script>
import Table from "./components/table";
import Upload from "./components/upload";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      loading: false,
      businessCode: [],
      businessArr: [],
      selArr: [],
      addKeyWordShow: false,
      searchKey: "",
      uploadShow: false,
      form: {},
      rule: {
        businessCode: [{ required: true, message: "必选", trigger: "change" }],
        keys: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  components: {
    Table,
    Upload
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.search();
      this.getBusinessList();
    },
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      const param = {
        pageNum,
        pageSize: 20,
        businessCode: this.businessCode,
        searchKey: this.searchKey
      };
      this.loading = true;
      const res = await this.$base.queryKeyList(param);
      this.loading = false;
      if (res) {
        this.tableData = res.data.rows;
        this.total = res.data.totalCount;
      }
    },
    async getBusinessList() {
      const res = await this.$base.queryBusinessList();
      if (res) {
        this.businessArr = res.data;
      }
    },
    setSelArr(arr) {
      this.selArr = arr;
    },
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.runAdd();
        }
      });
    },
    async runAdd() {
      const data = JSON.parse(JSON.stringify(this.form));
      data.keys = [data.keys];
      this.loading = true;
      const res = await this.$base.addKeyList(data);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.addKeyWordShow = false;
        this.search();
      }
    },
    del() {
      this.$confirm(`确定删除这${this.selArr.length}项么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun();
      });
    },
    async delRun() {
      const res = await this.$base.delKeyList({
        ids: this.selArr.map(item => item.id)
      });
      if (res) {
        this.search();
      }
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
