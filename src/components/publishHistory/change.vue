<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        property="type"
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
</template>

<script>
  export default {
    data() {
      return {
        currentRow: null
      }
    },
    props: {
      tableData: Array
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      }
      // ,
      // handleCurrentChange(val) {
      //   this.currentRow = val;
      // }
    }
  }
</script>
