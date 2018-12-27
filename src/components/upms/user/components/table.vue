<template>
  <div>
    <div class="table-box">
      <el-table v-loading="loading" :style="{border:'1px solid #ebeef5'}" :data="tableData" :max-height="tableMaxHeight">
        <el-table-column prop="username" label="用户名" width="300">
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="200">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.sex?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="用户角色" width="300">
          <template slot-scope="scope">
            <span v-for="item in scope.row.hasRoles" :key="item.id">{{`${item.roleName} `}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属公司" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.company?scope.row.company.name:' '}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" width="300">
          <template slot-scope="scope">
            <span v-for="item in scope.row.belongDEPTs" :key="item.id">{{`${item.name} `}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="300">
        </el-table-column>
        <el-table-column label="账号状态" width="300">
          <template slot-scope="scope">
            <span style="color:green" v-if="scope.row.state===1">激活</span>
            <span v-else-if="scope.row.state===2" style="color:red">禁用</span>
            <span v-else style="color:grey">未激活</span>
          </template>
        </el-table-column>
        <el-table-column prop="createAuthor" label="创建人" width="300">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="300">
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
  </div>
</template>
<script>
import Com from "@/common/common";
export default {
  data() {
    return {
      tableMaxHeight: 0,
      okLoading: false
    };
  },
  props: {
    tableData: Array,
    total: Number,
    currentPage: Number,
    loading: Boolean
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
    mod(data) {
      this.$emit("mod", data);
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
      const res = await this.$upms.deleteUser(id);
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