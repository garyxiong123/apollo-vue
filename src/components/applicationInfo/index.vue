<template>


  <el-container>
    <el-header class="el-header">
      <div>
        <top-nav></top-nav>
      </div>
    </el-header>
    <el-container class="el-container">
      <el-aside width="220px" class="el-aside">
        <SliderInfo @changeEnv="getNamespaceInfos"></SliderInfo>
        <SliderProjectInfo></SliderProjectInfo>
        <SliderOperation></SliderOperation>
      </el-aside>

      <el-main class="el-main">
        <Namespace @changeEnv="getNamespaceInfos" class="namespace" v-for="(item , id) in namespaceInfos" :namespaceInfo="item" :key="id">
        </Namespace>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import TopNav from "../../components/main/components/topNav";
  import Namespace from "./namespace/index";
  import SliderInfo from "./sliderInfo/index";
  import SliderOperation from "./sliderOperation/index";
  import SliderProjectInfo from "./sliderProjectInfo/index";


  export default {
    data() {
      return {
        namespaceInfos: []
      }
    },

    mounted() {

      this.getNamespaceInfos();
    },
    methods: {
      async getNamespaceInfos() {
        let {appId, env, cluster} = this.$route.params;
        if (!env) {
          env = "DEV";
        }
        if (!cluster) {
          cluster = "default";
        }
        const res = await this.$auth.getNamespaceByApplicationAndEnv(appId, env, cluster)

        this.namespaceInfos = res.data;

      }
    },
    components: {
      TopNav,
      Namespace,
      SliderInfo,
      SliderProjectInfo,
      SliderOperation
    },
    filters: {},
    created() {
    },
  };
</script>


<style>

  .el-header {
    background-color: white;
  }

  .el-container {

    background-color: #f1f2f7;

  }

  .namespace {
    margin: 26px;
    border: solid;

  }

  .el-aside {
    /*background-color: #f1f2f7;*/
    color: #333;
    text-align: center;
    width: 200px;
    position: relative;
    padding-left: 18px;
    line-height: 40px;
  }

  .el-main {
    background-color: white;
    color: #ddd;
    text-align: center;
    margin: 20px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
