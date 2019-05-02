<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @row-click = "rowClick"
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
</template>

<script>
  export default {
    data() {
      return {
        releaseInfo: null
      }
    },
    props: {
      tableData: Array
    },

    methods: {
      // setCurrent(row) {
      //   this.$refs.singleTable.setCurrentRow(row);
      // },

      rowClick(row, event, column){
        this.$emit('versionChange', row )
        this.$refs.singleTable.getCurrentRow();
      },

    }
  }
</script>
