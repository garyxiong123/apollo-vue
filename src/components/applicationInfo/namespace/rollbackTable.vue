<template>
  <div>

    <div style="font-size:20px; font-weight: bold;">{{title}}
    </div>

    <el-table
      :data="rollbackData"
      style="width: 100%" stripe border :row-class-name="tableRowClassName">

      <el-table-column
        label="Type"
        width="100">

        <template slot-scope="scope">
          <i v-if="!scope.row.isDeleted && !scope.row.isModified" class="el-icon-success"></i>
          <i v-else class="el-icon-warning" style="color: #f0ad4e"></i>
          <span style="margin-left: 10px" :class="{ warn : scope.row.isDeleted || scope.row.isModified }">{{ scope.row.type}}</span>
        </template>

      </el-table-column>
      <el-table-column
        label="key"
        sortable
        min-width="100">

        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.entity.firstEntity.key}}</span>
          <!--<span v-if="scope.row.isDeleted || scope.row.isModified"-->
          <!--:class="{ warn :  scope.row.isModified , danger : scope.row.isDeleted}"> {{scope.row.entity.firstEntity.key}} </span>-->
        </template>
      </el-table-column>
      <el-table-column
        prop=".entity.firstEntity.value"
        label="回滚前"
        min-width="100">
      </el-table-column>

      <el-table-column
        prop="entity.secondEntity.value"
        label="回滚后"
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
        rollbackData: [],
        form: {
          id: '',
          key: '',
          value: '',
          comment: ''
        },
        formLabelWidth: '120px',
        title: ''
      }
    },
    props: {
      namespaceInfo: Object

    },
    mounted() {
      this.getData();
    },

    methods: {

      async getData() {

        let res = await this.$auth.getRecentTwoReleases(this.namespaceInfo.baseInfo);
        if(res.data.length <2){
          this.title = "当前无历史版本";
          return;
        }

        let compareRes = await this.$auth.compareRecentTwoReleases(this.namespaceInfo.baseInfo, res.data[0].id, res.data[1].id);
        this.title = res.data[0].name + "回滚到" + res.data[1].name;

        this.rollbackData = compareRes.data.changes;
        this.namespaceInfo.currentReleaseId = res.data[0].id;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.form = JSON.parse(JSON.stringify(row));
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

      async handleDeleteItem(itemId) {
        let res = await this.$auth.deleteItemById(this.namespaceInfo, itemId);
        if (res.status == "200") {
          //发送删除成功事件
          // location.reload();
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
