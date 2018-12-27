<template>
  <div class="table-box">
    <el-table
      v-loading="loading"
      :style="{border:'1px solid #ebeef5'}"
      :data="tableData"
      :max-height="tableMaxHeight"
    >
      <el-table-column prop="backgroundName" label="后台名称" min-width="250"></el-table-column>
      <el-table-column prop="code" label="code" min-width="150"></el-table-column>
      <el-table-column prop="url" label="URL地址" min-width="250"></el-table-column>
      <el-table-column prop="departmentNames" label="所属部门" min-width="250"></el-table-column>
      <el-table-column label="备注" min-width="300">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="200"
            trigger="click"
            :content="tableData[scope.$index].remark"
          >
            <el-button
              slot="reference"
              type="text"
            >{{tableData[scope.$index].remark?(tableData[scope.$index].remark.length>20?(tableData[scope.$index].remark.slice(0,20)+'...'):tableData[scope.$index].remark):''}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createAuthor" label="创建人" min-width="250"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editShow(scope.row)" type="text" size="small">编辑</el-button>
          <el-button
            @click.native.prevent="del(scope.row)"
            style="color:red"
            type="text"
            size="small"
          >删除</el-button>
          <el-button @click.native.prevent="token(scope.row)" type="text" size="small">Token管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pag :total="total" :current="currentPage" @change="changePage"/>
    <el-dialog :loading="tokenLoading" width="700px" title="token管理" :visible.sync="tokenVis">
      <div v-for="item in tokenArr" :key="item.id">
        <div style="display:flex;margin-bottom:15px;border-bottom:1px solid #e3e4e5">
          <i class="iconfont icon-key"></i>
          <div style="flex:6;word-break: break-all;">
            <div>{{item.appToken}}</div>
            <el-tag style="margin-top:10px;margin-bottom:5px;">{{'有效期至：'+item.validityPeriod}}</el-tag>
          </div>
          <div style="flex:1;text-align:right">
            <i :data-clipboard-text="item.appToken" class="el-icon-tickets" title="copy"></i>
            <i @click="delToken(item.id)" class="el-icon-delete" title="delete"></i>
          </div>
        </div>
      </div>
      <el-button v-if="tokenArr.length<2" @click="addToken" type="success">新增token</el-button>
    </el-dialog>
  </div>
</template>
<script>
import Com from "@/common/common";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      tableMaxHeight: 0,
      tokenVis: false,
      tokenArr: [
        {
          id: 1,
          appId: 11,
          appCode: "qwe",
          appToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6MTEsImFwcENvZGUiOiJxd2UiLCJ0aW1lIjoxNTQ0NDI5NjkyMDk1fQ.dA4kGpnXv12hrUAqKPl2StLwO0PFJpAD_CJnQoceMag",
          validityPeriod: "2019-12-10",
          isDeleted: false
        }
      ],
      tokenLoading: false,
      nowData: {}
    };
  },
  props: {
    tableData: Array,
    total: Number,
    currentPage: Number,
    loading: Boolean
  },
  filters: {
    tokenFormat(text) {
      return text.slice(0, 20) + "......" + text.slice(-20);
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
    async token(data) {
      this.initTokenCopy();
      this.tokenVis = true;
      this.tokenLoading = true;
      this.nowData = data;
      // const res = await this.$upms.getAppToken(data.id, data.code);
      this.tokenLoading = false;
      // if (res) {
      // }
    },
    initTokenCopy() {
      this.clipboard = new ClipboardJS(".el-icon-tickets");
      this.clipboard.on("success", () => {
        this.$message({
          type: "success",
          message: "token已复制到剪切板"
        });
      });
      this.clipboard.on("error", () => {
        this.$message({
          type: "error",
          message: "复制失败"
        });
      });
    },
    async addToken() {
      this.tokenLoading = true;
      const res = await this.$upms.addAppToken({
        appCode: this.data.code,
        appId: this.data.id
      });
      this.tokenLoading = false;
      if (res) {
        this.token(this.data);
        this.$message({
          type: "success",
          message: "新增成功"
        });
      }
    },
    async delToken(id) {
      this.$confirm(`确定删除该token么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delTokenRun(id);
      });
    },
    async delTokenRun(id) {
      this.tokenLoading = true;
      const res = await this.$upms.delAppToken(id);
      this.tokenLoading = false;
      if (res) {
        this.token(this.data);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }
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
.icon-key {
  font-size: 24px;
  margin-right: 10px;
}
.el-icon-tickets {
  font-size: 20px;
  cursor: pointer;
  // color: #e6a23c;
}
.el-icon-delete {
  font-size: 20px;
  // color: red;
  cursor: pointer;
}
</style>
