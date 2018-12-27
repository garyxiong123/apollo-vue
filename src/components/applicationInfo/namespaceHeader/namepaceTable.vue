<template>
  <el-table
    :data="getData"
    style="width: 100%" stripe border :row-class-name="tableRowClassName">

    <el-table-column
      label="发布状态"
      width="180">

      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ !scope.row.isDeleted && !scope.row.isModified ? "已发布":"待发布" }}</span>
      </template>

    </el-table-column>
    <el-table-column
      prop="key"
      label="key"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="value"
      label="value"
      width="280">
    </el-table-column>
    <el-table-column
      prop="comment"
      label="备注"
      width="180">
    </el-table-column>

    <el-table-column
      prop="dataChangeLastModifiedBy"
      sortable
      label="最后修改人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="dataChangeLastModifiedTime"
      sortable
      label="修改时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="操作"
      width="180">

      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      items: Array

    },
    computed: {
      getData() {
        const data = this.items;
        return data ? data.map(
          item => {
            item.item.isDeleted = item.isDeleted;
            item.item.isModified = item.isModified;

            return item.item
          }) : []
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

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
