<template>
  <div class="all">
    <div>
      <top-nav></top-nav>
    </div>

    <div>
      发布历史
    </div>
    <!--</el-header>-->

    <el-container>

      <el-aside width="520px">
        <Version :tableData="releaseHistoryList" @versionChange="handleVersionChange(releaseInfo1)"></Version>
      </el-aside>

      <el-main class="el-main">

        <el-tabs v-model="activeName" type="border-card" style="border: 0px" @tab-click="handleClick">
          <el-tab-pane label="变更的配置" name="change">
            <Change :tableData="configChangeItems"></Change>
          </el-tab-pane>
          <el-tab-pane label="全部配置" name="all">
            <All :tableData="configItems"></All>
          </el-tab-pane>
        </el-tabs>


      </el-main>
    </el-container>

  </div>


</template>
<script>
  import TopNav from "../main/components/topNav";
  import Version from "./version";
  import Change from "./change";
  import All from "./all";

  export default {
    data() {
      return {
        releaseHistoryList: [],
        loading: false,
        activeName: "change",
        configChangeItems: Array,
        configItems: []

      }
    },

    components: {
      TopNav,
      Version,
      Change,
      All
    },
    props: {
      namespaceInfo: Object
    },

    mounted() {
      this.activeName = "change";
      //获取发布历史
      this.getPublishHistory();
    },
    methods: {

      handleClick() {

      },
      async handleVersionChange(releaseInfo1) {
        debugger
        // debugger
        // let configRes = await this.$auth.getConfigChangeDetailByEnv(env, this.releaseHistoryList.indexOf(currentRow).releaseId, this.releaseHistoryList.indexOf(currentRow).previousReleaseId);

      },

      async getPublishHistory() {

        let applicationName = this.$route.params.appId;
        let env = this.$route.query.env;
        //保存基本信息 ，env， appName, cluster, namespace
        let appBaseInfo = this.$route.query;
        appBaseInfo.appId = applicationName;
        let res = await this.$auth.getPublishHistoryByAppIdAndEnvAndClusterAndNamespaceInPage(appBaseInfo);
        this.releaseHistoryList = res.data;
        this.configItems = res.data[0].configuration;

        let configRes = await this.$auth.getConfigChangeDetailByEnv(env, this.releaseHistoryList[0].releaseId, this.releaseHistoryList[0].previousReleaseId);

        this.configChangeItems = configRes.data.changes;


      }
      // async getConfigChangeDetail(releaseHistoryList) {
      //
      //   let applicationName = this.$route.params.appId;
      //   let env = this.$route.query.env;
      //   debugger
      //   let res = await this.$auth.getConfigChangeDetailByEnv(env, releaseHistoryList[0].releaseId, releaseHistoryList[0].previousReleaseId);
      //   this.configChangeItems = res.data;
      //   return res.data;
      //
      // }


    }
  };
</script>
<style lang="scss" scoped>
  .all {

  }


</style>
