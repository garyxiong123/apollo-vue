<template>
  <div class="outer-box">
    <div class="card-box">
      <div v-if="isAdding">
        <slot></slot>
      </div>
      <span style="display:inline-block;width:200px;heigth:80px" @click="$emit('show')" v-else>+ 增加主体</span>
    </div>
    <div class="oper-box" :style="{backgroundColor: isAdding?'#f7f9fa':'#fff'}">
      <div v-if="isAdding">
        <div class="btn1" @click="$emit('cancel')">取消</div>
        <div class="btn2" @click="$emit('ok')">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isAdding: Boolean
  }
};
</script>
<style lang="scss" scoped>
.outer-box {
  display: inline-block;
  width: 320px;
  height: 188px;
  margin: 8px;
  background: #fff;
  border: 1px dashed #ddd;
  cursor: pointer;
}
.card-box {
  padding: 24px;
  background: #fff;
  text-align: center;
  height: 100px;
  line-height: 148px;
  overflow: hidden;
}
.oper-box {
  height: 40px;
  overflow: hidden;
  .btn1,
  .btn2 {
    display: inline-block;
    line-height: 40px;
    width: 49%;
    &:hover {
      cursor: pointer;
      color: #1890ff;
    }
  }
}
</style>
