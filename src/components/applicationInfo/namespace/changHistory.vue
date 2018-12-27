<template>
  <div class="break-line">
    <el-table
      :data="getData"
      style="width: 100%" stripe border :row-class-name="tableRowClassName">

      <el-table-column
        label="type"
        min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="key"
        label="key"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="value"
        label="Old Value"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="value"
        sortable
        label="New Value"
        min-width="100">
      </el-table-column>

      <el-table-column
        prop="comment"
        label="备注"
        min-width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      items: Object

    },
    computed: {


      getData() {
        let changeSets = JSON.parse(this.items.changeSets);
        let changeItemArray = new Array();
        changeSets.createItems.forEach((item) => {
          item.type = "新增"
        })
        changeSets.updateItems.forEach((item) => {
          item.type = "修改"
        })
        changeSets.deleteItems.forEach((item) => {
          item.type = "删除"
        })
        changeItemArray = changeItemArray.concat(changeSets.createItems).concat(changeSets.deleteItems).concat(changeSets.updateItems);

        return changeItemArray;
      }
    },

    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
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
