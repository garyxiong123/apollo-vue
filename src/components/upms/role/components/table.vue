<template>
  <div class="table-box">
    <el-table v-loading="loading" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
      <el-table-column prop="roleName" label="角色名称" min-width="250">
      </el-table-column>
      <el-table-column label="描述" min-width="300">
        <template slot-scope="scope">
          <el-popover placement="top" width="200" trigger="click" :content="scope.row.description">
            <el-button slot="reference" type="text">{{scope.row.description?(scope.row.description.length>20?(scope.row.description.slice(0,20)+'...'):scope.row.description):''}}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="scopeName" label="权限范围" min-width="250">
      </el-table-column>
      <el-table-column prop="createAuthor" label="创建人" min-width="250">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="250">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button @click.native.prevent="mod(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button style="color:red" @click.native.prevent="del(scope.row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pag :total="total" :current="currentPage" @change="changePage" />
  </div>
</template>
<script>
import Com from "@/common/common";
export default {
  data() {
    return {
      tableMaxHeight: 0,
      editFormVisible: false,
      authVisible: false,
      editForm: {
        roleName: "",
        userIdList: []
      },
      defaultProps: {
        children: "childList",
        label: "name"
      },
      editRule: {
        roleName: [
          { required: true, message: "必填", trigger: "blur" },
          { max: 50, message: "不能超过50位", trigger: "blur" }
        ],
        roleDesc: [{ max: 200, message: "不能超过200位", trigger: "blur" }]
      },
      nowRole: "",
      okLoading: false,
      okLoading1: false
    };
  },
  props: {
    tableData: Array,
    total: Number,
    currentPage: Number,
    loading: Boolean,
    authTree: Object,
    allUser: Array,
    formType: Number
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
    mod(row) {
      this.$emit("showMod", row.id);
    },
    del(data) {
      this.$confirm(`确定删除该项么?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delRun(data.id);
      });
    },
    async delRun(id) {
      const res = await this.$upms.delRole(id);
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
</style>
