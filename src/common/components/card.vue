<template>
  <div class="outer-box">
    <div class="card-box">
      <div v-if="cardData.id!==updateId">
        <img class="card-logo" :src="require('../../assets/youyu-logo.png')" alt="logo">
        <div class="card-body">
          <div class="card-title">{{cardData.name}}</div>
          <div class="card-desc">{{cardData.description}}</div>
        </div>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </div>
    <div class="oper-box">
      <div @click="$emit('edit')" v-if="cardData.id!==updateId" class="btn1">编辑</div>
      <div @click="$emit('cancel')" v-else class="btn1">取消</div>
      <div @click="$emit('delete')" v-if="cardData.id!==updateId" class="btn2">删除</div>
      <div @click="$emit('ok')" v-else class="btn2">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cardData: Object,
    updateId: String
  }
};
</script>
<style lang="scss" scoped>
.outer-box {
  display: inline-block;
  width: 320px;
  height: 188px;
  margin: 8px;
  border: 1px solid #ebeef5;
}
.card-box {
  padding: 24px;
  background: #fff;
  text-align: left;
  height: 100px;
  overflow: hidden;
  .card-logo {
    float: left;
    width: 50px;
    margin-right: 16px;
  }
  .card-body {
    .card-title {
      padding: 10px 0;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.oper-box {
  height: 40px;
  background-color: #f7f9fa;
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
