<template>
  <div class="outer-box">
    <div v-if="!pageType">
      <operBar :navs="['用户管理','菜单管理']" />
      <div style="text-align:left;margin-top:10px;">
        <el-form inline>
          <el-form-item>
            <el-button type="primary" @click="pageType=1">添加菜单</el-button>
            <el-button type="primary" @click="uploadShow=true">批量上传</el-button>
          </el-form-item>
          <el-form-item>
            <div @keydown.enter="search()">
              <el-input v-model="text" suffix-icon="el-icon-search" placeholder="请输入菜单名称"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="所属后台">
            <el-select filterable v-model="type">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in allBack" :key="item.id" :label="item.backgroundName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage" @edit="editShow" @search="search"></Table>
    </div>
    <Add :roles="roles" :allBack="allBack" v-if="pageType===1" @search="search" @close="pageType=0"></Add>
    <Mod :modDataO="modData" :allBack="allBack" v-if="pageType===2" @search="search" @close="pageType=0"></Mod>
    <Upload @search="search" @close="uploadShow=false" :uploadShow="uploadShow"></Upload>
  </div>
</template>
<script>
import Table from "./components/table";
import Add from "./components/add";
import Mod from "./components/mod";
import Upload from "./components/upload";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      modData: {},
      tableData: [],
      allBack: [],
      type: "",
      text: "",
      uploadShow: false,
      total: 0,
      currentPage: 1,
      loading: false,
      okLoading: false,
      pageType: 0,
      roles: []
    };
  },
  components: {
    Table,
    Add,
    Mod,
    Upload
  },
  created() {
    this.search();
    this.getAllBack();
    this.getRoles();
  },
  methods: {
    async search(pageNum = 1) {
      this.currentPage = pageNum;
      this.loading = true;
      const param = `?pageNum=${pageNum}&pageSize=20`;
      const res = await this.$users.getAllMenu(param, {
        backgroundId: this.type,
        permissionName: this.text
      });
      this.tableData = res.data.rows;
      this.tableData.forEach(item => {
        if (item.createTime) {
          item.createTime = item.createTime.replace("T", " ");
        }
      });
      this.total = res.data.totalCount;
      this.loading = false;
    },
    async getAllBack() {
      const res = await this.$users.getRoleAssignInfo();
      if (res) {
        this.allBack = res.data.assignableBackground;
      }
    },
    async getRoles() {
      const res = await this.$users.getAuthRoles();
      if (res) {
        this.roles = res.data;
      }
    },
    editShow(data) {
      this.modData = data;
      this.pageType = 2;
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
