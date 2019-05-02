<template>
  <el-select class="el-select" value="搜索项目(appid或者项目名称)" filterable placeholder="搜索项目(appid或者项目名称)" @change="onSelect">
    <el-option
      v-for="item in applications"
      :key="item.id"
      :label="item.name"
      :value="item.appId">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        applications: Array
      }
    },

    mounted() {

      this.applications = JSON.parse(localStorage.getItem("applications"))
    },

    methods: {
      onSelect(appId) {
        console.log(appId);

        this.$router.push({ path: `/applicationInfo/${appId}` })
        location.reload();

      }
    }


  }
</script>


<style>


  .el-select {

    margin-top: 10px;

  }

</style>
