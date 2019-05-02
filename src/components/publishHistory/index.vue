<template>
  <div class="all">
    <div>
      <top-nav></top-nav>
    </div>

    <div>
      发布历史
    </div>
    <el-container>

      <el-aside width="520px">
        <div>
          <el-table
            ref="singleTable1"
            :data="releaseHistoryList"
            highlight-current-row
            @row-click="rowClick"
            style="width: 100%">
            <el-table-column
              property="operator"
              label="用户"
              min-width="50">
            </el-table-column>
            <el-table-column
              property="operationContext.isEmergencyPublish"
              label="发布类型"
              min-width="50">
            </el-table-column>
            <el-table-column
              min-width="50"
              property="releaseTimeFormatted"
              label="发布时间">
            </el-table-column>
            <el-table-column
              min-width="50"
              property="releaseTime"
              label="具体发布时间">
            </el-table-column>
            <el-table-column
              property="releaseTitle"
              label="发布版本号">
            </el-table-column>
          </el-table>
        </div>

      </el-aside>

      <el-main class="el-main">

        <el-tabs v-model="activeName" type="border-card" style="border: 0px" @tab-click="handleClick">
          <el-tab-pane label="变更的配置" name="change">
            <div>
              <el-table
                ref="singleTable2"
                :data="configChangeItems"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="oper"
                  label="Type"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  property="entity.firstEntity.key"
                  label="Key"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  min-width="120"
                  property="entity.firstEntity.value"
                  label="Old Value">
                </el-table-column>
                <el-table-column
                  min-width="120"
                  property="entity.secondEntity.value"
                  label="New Value">
                </el-table-column>
              </el-table>
            </div>


          </el-tab-pane>
          <el-tab-pane label="全部配置" name="all">

            <div>
              <el-table
                ref="singleTable3"
                :data="configItems"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="firstEntity"
                  label="key"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  property="secondEntity"
                  label="value"
                  min-width="120">
                </el-table-column>
              </el-table>
            </div>
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
        configChangeItems: [],
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
      this.getPublishHistory(0);
    },
    methods: {


      transform(changes) {
        changes.forEach(item => {
          if (item.type == "MODIFIED") {
            item.oper = "修改"
          } else if (item.type == "ADDED") {
            item.oper = "新增"
          } else {
            item.oper = "删除"
          }
        })
        return changes;
      },

      async rowClick(row, event, column) {
        let env = this.$route.query.env;
        let configRes = await this.$auth.getConfigChangeDetailByEnv(env, row.releaseId, row.previousReleaseId);
        this.configChangeItems = this.transform(configRes.data.changes);
        this.configItems = row.configuration;
      },

      handleClick() {

      },

      async getPublishHistory(index) {

        let applicationName = this.$route.params.appId;
        let env = this.$route.query.env;
        //保存基本信息 ，env， appName, cluster, namespace
        let appBaseInfo = this.$route.query;
        appBaseInfo.appId = applicationName;
        let res = await this.$auth.getPublishHistoryByAppIdAndEnvAndClusterAndNamespaceInPage(appBaseInfo);
        this.releaseHistoryList = res.data;
        this.configItems = res.data[index].configuration;
        let configRes = await this.$auth.getConfigChangeDetailByEnv(env, this.releaseHistoryList[index].releaseId, this.releaseHistoryList[index + 1].previousReleaseId);

        this.configChangeItems = this.transform(configRes.data.changes);


      }

    }
  };
</script>
<style lang="scss" scoped>
  .all {

  }


</style>
