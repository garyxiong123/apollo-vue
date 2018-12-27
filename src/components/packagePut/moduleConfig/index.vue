<template>
    <div class="box">
        <operBar :navs="['包发布管理','模块管理配置']" />
        <div style="text-align:left;margin-top:10px;">
            <el-form inline>
                <el-form-item>
                    <el-button @click="$router.push('/packagePut/moduleConfig/add')" type="primary">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <div @keydown.enter="search()">
                        <el-input clearable suffix-icon="el-icon-search" placeholder="请输入"></el-input>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <ATable :loading="loading" :tableData="tableData" :total="total" :currentPage="currentPage"@search="search" />
        </div>
    </div>
</template>
<script>
import ATable from "./components/aTable";
export default {
  data() {
    return {
      type: "",
      tableData: [{name:'测试'}],
      total: 0,
      currentPage: 1,
      loading: false
    };
  },
  components: {
    ATable
  },
  methods: {
    search() {}
  }
};
</script>
<style lang="scss" scoped>
.box{
    padding:0 10px;
}
</style>