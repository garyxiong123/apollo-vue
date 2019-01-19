<template>
<div>

  version.....
</div>


</template>
<script>
  import TopNav from "../main/components/topNav";

  export default {
    data() {
      return {
        applications: [],
        loading: false
      }
    },

    components: {
      TopNav
    },

    mounted() {
      // this.getApplications();
    },

    methods: {}
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
