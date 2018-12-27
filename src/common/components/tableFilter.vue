<template>
    <div>
        <el-button @click="showTableFilter" class="table-bar-btn">显示字段</el-button>
        <div v-if="tableFilterShow" class="table-filter-box">
            <div class="table-filter-inner">
                <el-checkbox-group v-model="tableFilterSave">
                    <el-checkbox v-for="item in tableFilterArr" :disabled="item.check" :checked="tableFilterArr.indexOf(item.val) !== -1" :key="item.val" :label="item.val">{{item.label}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="table-filter-oper">
                <el-button @click="filterTable" type="text">确认</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.table-filter-box {
  position: absolute;
  top: 50px;
  right: 0;
  width: 180px;
  background: #fff;
  z-index: 3;
  .table-filter-inner {
    height: 240px;
    overflow: auto;
    border: 1px solid #eee;
  }
  .table-filter-oper {
    background: #eff4f8;
    text-align: right;
    height: 50px;
  }
}
</style>
