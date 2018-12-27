<template>
  <div class="search-bar">
    <slot name="others"></slot>
    <span @keydown.enter="search">
      <el-input clearable class="search-input" v-model="searchText" :placeholder="placeholder">
      <slot slot="prepend"></slot>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    </span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText: ""
      };
    },
    props: {
      placeholder: String
    },
    methods: {
      search() {
        this.$emit("search", this.searchText, 1);
      }
    }
  };
</script>
<style lang="scss" scoped>

  .el-input {
    margin: 10px;
  }



  .search-bar {
    .search-input {
      width: 500px;
    }
  }
</style>
