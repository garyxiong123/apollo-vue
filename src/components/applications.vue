<template>
  <div v-loading="loading">
    <top-nav></top-nav>
    <el-row :gutter="24">
      <el-col :span="4" v-for="(app, index) in apps" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="float: left;">{{app.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleClick(app)">详情</el-button>
          </div>
          <div style="float: left; padding: 3px 0">
            {{app.appId}}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import TopNav from "./main/components/topNav";

  export default {
    data() {
      return {
        apps: [],
        loading: false
      }
    },

    components: {
      TopNav
    },

    mounted() {
      this.getApplications();
    },

    methods: {
      async getApplications() {
        this.loading = true;
        const res = await this.$auth.getAllApps();
        this.loading = false;
        this.apps = res.data;
      },
      handleClick: function (item) {
        this.$router.push("/applicationInfo/" + item.name);
      },
      clickApplication(item) {
        this.$router.push("/applicationInfo/" + item.name);
      },
    }
  };
</script>
<style lang="scss" scoped>

  .solidBody {
    padding: 0px;
    border: solid;

  }

  .no-auth-box {
    padding: 150px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .el-icon-warning {
    color: goldenrod;
    font-size: 150px;
  }

  .text {
    margin-left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }


</style>
