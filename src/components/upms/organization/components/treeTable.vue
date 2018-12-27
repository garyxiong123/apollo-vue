<template>
    <el-table :row-style="showRow" :cell-style="{textAlign:'left'}" :data="treeData">
        <el-table-column v-for="(cols,index) in col" :key="cols.id" :label="cols.name" :min-width="cols.width">
            <template slot-scope="scope">
                <span class="space" v-if="index === 0" v-for="ind in scope.row._level" :key="ind"></span>
                <span class="space-min" v-if="iconShow(scope.row,index)" @click="toggleCollapse(scope.$index)">
                    <i v-if="!scope.row._expanded" class="plus-btn el-icon-caret-right"></i>
                    <i v-else class="min-btn el-icon-caret-right"></i>
                    {{scope.row[cols.key]}}
                </span>
                <span v-else>
                    {{scope.row[cols.key]}}
                </span>
            </template>
        </el-table-column>
        <slot></slot>
    </el-table>
</template>
<script>
import treeToArr from "./treeToArr.js";
export default {
  props: {
    tableData: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    col: Array
  },
  computed: {
    treeData() {
      const data = treeToArr(this.tableData, this.expandAll);
      return data;
    }
  },
  methods: {
    showRow(row) {
      if (row.row._parent) {
        if (!row.row._parent._expanded) {
          row.row._expanded = false;
          return "display:none";
        }
      }
    },
    toggleCollapse(index) {
      const data = this.treeData[index];
      data._expanded = !data._expanded;
    },
    iconShow(data, index) {
      return index === 0 && data.childrens && data.childrens.length > 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.space {
  margin-left: 20px;
}
.space-min {
  margin-left: -16px;
  cursor: pointer;
}
.plus-btn {
  font-size: 16px;
  color: #3e81e0;
  transform: rotate(0deg);
  transition: 300ms all;
}
.min-btn {
  font-size: 16px;
  color: #E6A23C;
  transform: rotate(90deg);
  transition: 300ms all;
}
</style>
