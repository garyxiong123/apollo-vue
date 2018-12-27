<template>
  <div class="outer-box">
    <div v-if="!pageType">
      <operBar :navs="['用户管理','组织机构管理']" />
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <el-button type="primary" @click="pageType=1">添加机构</el-button>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="orgName" suffix-icon="el-icon-search" placeholder="请输入机构名称"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="机构类型">
            <el-select v-model="orgType">
              <el-option label="全部" value=""></el-option>
              <el-option label="公司" value="COM"></el-option>
              <el-option label="部门" value="DEPT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <treeTable :tableData="treeTableData" :col='col'>
        <el-table-column label="创建时间" min-width="300">
          <template slot-scope="scope">
            <span>{{scope.row.createTime?scope.row.createTime.replace('T',' '):''}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="300">
          <template slot-scope="scope">
            <el-button @click="mod(scope.row)" type="text">编辑</el-button>
            <el-button @click="delRow(scope.row)" style="color:red" type="text">删除</el-button>
          </template>
        </el-table-column>
      </treeTable>
    </div>
    <Add :allDep="innerTree" :allCom="allCom" v-if="pageType===1" @search="search" @close="pageType=0"></Add>
    <Mod :allDep="innerTree" :allCom="allCom" @search="search" :modData="modData" v-if="pageType===2" @close="pageType=0"></Mod>
  </div>
</template>
<script>
import treeTable from "./components/treeTable";
import Add from "./components/add";
import Mod from "./components/mod";
export default {
  data() {
    return {
      orgName: "",
      orgType: "",
      modData: {},
      allCom: [],
      treeTableData: [],
      innerTree:[],
      col: [
        { name: "机构名称", key: "name", width: "250" },
        { name: "机构类型", key: "typeName", width: "100" },
        { name: "备注", key: "remark", width: "300" },
        { name: "创建人", key: "createAuthor", width: "200" }
      ],
      type: "",
      text: "",
      loading: false,
      okLoading: false,
      pageType: 0
    };
  },
  components: {
    treeTable,
    Add,
    Mod
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      this.loading = true;
      const param = `?orgName=${this.orgName}&orgType=${this.orgType}`;
      const res = await this.$users.getOrgByOrg(param);
      this.treeTableData = res.data;
      if (!this.orgName&&!this.orgType) {
        this.innerTree = res.data;
      }
      this.loading = false;
      this.getAllCom();
    },
    async getAllCom() {
      const res = await this.$users.getAllOrg();
      this.allCom = res.data;
    },
    mod(data) {
      this.modData = data;
      this.pageType = 2;
    },
    delRow(data) {
      this.$confirm(`确定删除该条记录么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun(data.id);
      });
    },
    async delRun(id) {
      const res = await this.$users.delOrg(id);
      if (res) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
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
