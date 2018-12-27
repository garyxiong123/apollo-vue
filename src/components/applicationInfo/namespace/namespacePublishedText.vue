<template>
  <div>
    {{publishedText}}
  </div>
</template>

<script>

  // import DataUtil from "../../../util/data"

  export default {
    data() {
      return {
        publishedText: {}
      }
    },

    props: {
      items: Object

    },
    mounted() {

      this.getNamespacePublishedText();

    },
    components: {
      // DataUtil
    },


    methods: {

      async getNamespacePublishedText() {
        debugger
        let {appId, env, namespaceName, clusterName} = this.$route.params;
        if (!env) {
          env = "DEV";
        }
        if (!cluster) {
          cluster = "default";
        }
        if (!namespaceName) {
          namespaceName = "application"
        }
        const res = await this.$auth.getNamespacePublishedTextByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName);

      }

    }
  }
</script>
<style>

  .break-line {
    margin-top: 30px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
