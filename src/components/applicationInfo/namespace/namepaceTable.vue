<template>
  <div>
    <el-table
      :data="getData.filter(data => !search || data.key.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%" stripe border :row-class-name="tableRowClassName" @row-dblclick="doubleClick">

      <el-table-column
        label="发布状态"
        width="100">

        <template slot-scope="scope">
          <i v-if="!scope.row.isDeleted && !scope.row.isModified" class="el-icon-success"></i>
          <i v-else class="el-icon-warning" style="color: #f0ad4e"></i>
          <span style="margin-left: 10px" :class="{ warn : scope.row.isDeleted || scope.row.isModified }">{{ !scope.row.isDeleted && !scope.row.isModified ? "已发布":"未发布" }}</span>
        </template>

      </el-table-column>
      <el-table-column
        label="key"
        sortable
        min-width="100">

        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.key }}</span>
          <span v-if="scope.row.isDeleted || scope.row.isModified"
                :class="{ warn :  scope.row.isModified , danger : scope.row.isDeleted}"> {{scope.row.isDeleted?"删":"修改"}} </span>
        </template>

      </el-table-column>
      <el-table-column
        prop="value"
        label="value"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="备注"
        min-width="100">
      </el-table-column>

      <el-table-column
        prop="dataChangeLastModifiedBy"
        sortable
        label="最后修改人"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="dataChangeLastModifiedTime"
        sortable
        label="修改时间"
        min-width="100">
      </el-table-column>
      <el-table-column fixed="right"
                       prop="name"
                       label="操作"
                       min-width="100">

        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字key搜索"/>
        </template>


        <template slot-scope="scope">
          <i class="el-icon-edit-outline operate"
             @click="handleEdit(scope.$index, scope.row)"></i>
          <i class="el-icon-close operate" @click="handleDelete(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>


    </el-table>


    <el-dialog title="修改配置项" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Key" :label-width="formLabelWidth">
          <el-input v-model="form.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Value" :label-width="formLabelWidth">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="comment" :label-width="formLabelWidth">
          <el-input v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditItem">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="删除配置" :visible.sync="deleteDialogFormVisible">
      <span>确认要删除配置??</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDeleteItem(form.id)">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="查看配置" :visible.sync="checkDialogFormVisible" @close="checkDialogFormVisible = false">
      <!--<span>{{rowKey}} : {{rowValue}}</span>-->
      <el-form >
        <el-form-item label="Key" :label-width="formLabelWidth">
          <el-input v-model="rowKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Value" :label-width="formLabelWidth">
            <el-input v-model="rowValue" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        deleteDialogFormVisible: false,
        checkDialogFormVisible: false,
        rowKey:'',
        rowValue:'',
        search: '',
        form: {
          id: '',
          key: '',
          value: '',
          comment: ''
        },
        formLabelWidth: '120px'
      }
    },
    props: {
      namespaceInfo: Object

    },
    computed: {
      getData() {
        const data = this.namespaceInfo.items;
        return data ? data.map(
          item => {
            item.item.isDeleted = item.isDeleted;
            item.item.isModified = item.isModified;

            return item.item
          }) : []
      }
    },

    methods: {

      doubleClick(row, event) {
        this.checkDialogFormVisible = true;
        this.rowKey = row.key;
        this.rowValue = row.value;
      }
      ,
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
