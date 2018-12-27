<template>
  <div>
    <NameSpaceHeader :namespaceInfo="namespaceInfo"></NameSpaceHeader>
    <div>
      <el-tabs type="border-card" style="border: 0px" @tab-click="handleClick">
        <el-tab-pane label="表格">
          <NamespaceTable :items="namespaceInfo.items"></NamespaceTable>
        </el-tab-pane>
        <el-tab-pane label="文本">文本
          <NamespacePublishedText></NamespacePublishedText>
        </el-tab-pane>
        <el-tab-pane label="更改历史">

          <ChangHistory v-for="(changeItemHistory, id) in changeItemsHistory" :key="id"
                        :items="changeItemHistory"></ChangHistory>

        </el-tab-pane>
        <el-tab-pane label="实例列表">
          <!--<ChangHistory v-for="(changeItemHistory, id) in changeItemsHistory" :key="id"></ChangHistory>-->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>

  import NameSpaceHeader from "../namespaceHeader/index";
  import NamespaceTable from "../namespaceHeader/namepaceTable";
  import ChangHistory from "./changHistory"
  import NamespacePublishedText from "./namespacePublishedText";


  export default {
    data() {
      return {
        changeItemsHistory: []
      };
    },
    props: {
      namespaceInfo: Object
    },
    methods:
      {
        handleClick(tab, event) {
          // if(tab.index = "2"){
          //   return JSON.parse(JSON.stringify(this.changeItemsHistory));
          // }
          console.log(tab, event);
        },

        async getChangeItemsHistory() {

          let {appId, env, namespaceName, clusterName} = this.$route.params;
          debugger
          let res = await this.$auth.getChangeHistoryByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName)
          this.changeItemsHistory = res.data;
        }
      }
    ,
    mounted() {
      this.getChangeItemsHistory();
    },
    components: {
      NameSpaceHeader,
      NamespaceTable,
      ChangHistory,
      NamespacePublishedText
    }
  }
  ;
</script>
<style>
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border: 1px solid #ddd;
  }

  .panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  .project-info {
    width: 100%;
  }

  table {
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

</style>
