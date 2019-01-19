<template>
  <div>
    <el-table
      :data="getData"
      style="width: 100%" stripe border :row-class-name="tableRowClassName">

      <el-table-column
        label="key"
        sortable
        min-width="100">

        <template slot-scope="scope">
          <span v-if="scope.row.isDeleted || scope.row.isModified"
                :class="{ warn : scope.row.isModified, danger : scope.row.isDeleted}"> {{scope.row.isDeleted?"删除":"修改"}} </span>
          <span style="margin-left: 10px">{{ scope.row.key }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="oldValue"
        label="发布的值"
        min-width="100">
      </el-table-column>

      <el-table-column
        prop="newValue"
        label="未发布的值"
        min-width="100">
      </el-table-column>

      <el-table-column
        prop="dataChangeLastModifiedBy"
        sortable
        label="最后修改人"
        min-width="100">
      </el-table-column>
      <el-table-column
        fixed='true'
        prop="dataChangeLastModifiedTime"
        sortable
        label="修改时间"
        min-width="100">
      </el-table-column>


    </el-table>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        deleteDialogFormVisible: false,
        form: {
          id: '',
          key: '',
          value: '',
          comment: ''
        },
        formLabelWidth: '150px'
      }
    },
    props: {
      namespaceInfo: Object

    },
    computed: {
      getData() {
        const data = this.namespaceInfo.items;
        return data ? data.filter(item => item.item.isDeleted || item.item.isModified).map(
          item => {
            item.item.isDeleted = item.isDeleted;
            item.item.isModified = item.isModified;
            item.item.oldValue = item.oldValue;
            item.item.newValue = item.newValue;
            return item.item
          }) : []
      }
    },

    methods: {

      handleEdit(index, row) {
        console.log(index, row);
        this.form = JSON.parse(JSON.stringify(row));
        // this.form.value = row.value;
        // this.form.comment = row.comment;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.form.id = row.id;
        this.deleteDialogFormVisible = true;

      },
      async handleEditItem() {
        let res = await this.$auth.updateItem(this.namespaceInfo, this.form);
        if (res.status == "200") {
          //发送删除成功事件
          this.$emit('changeEnv', 1, 2, 3);
        }
        this.dialogFormVisible = false;
      },

      async handleDeleteItem() {
        let res = await this.$auth.deleteItemById(this.namespaceInfo, this.form.id);
        if (res.status == "200") {
          //发送删除成功事件
          this.$emit('changeEnv', 1, 2, 3);
        }
        this.deleteDialogFormVisible = false;

      },

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


  .operate {
    font-size: 23px;
    cursor: pointer;
  }

  .warn {
    /*font-size: 13px;*/
    background-color: #f0ad4e;
    margin-left: 10px;
    color: white;
    font-weight: bold;
    padding: 1px;
  }

  .danger {
    background-color: #d9534f;
    margin-left: 10px;
    color: white;
    font-weight: bold;
    padding: 1px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
