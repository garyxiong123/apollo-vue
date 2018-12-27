<template>
  <div class="form-page-box">
    <div v-if="descTitle" class="form-page-desc">
      <h4 class="desc-title">{{descTitle}}</h4>
      <p class="desc-content">{{descCon}}</p>
      <hr>
    </div>
    <div :style="{width}" class="form-page-innerbox">
      <slot></slot>
      <div class="form-page-oper-bar" :style="{textAlign:btnPosition}">
        <el-button :disabled="okDisabled" class="oper-btn" v-if="okBtn" :loading="okLoading" type="success" @click="ok()">{{okText}}</el-button>
        <el-button class="oper-btn" v-if="cancelBtn" @click="cancel()">{{cancelText}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    descTitle: { type: String, default: "" },
    descCon: { type: String, default: "" },
    width: { type: String, default: "800px" },
    cancelBtn: { type: Boolean, default: true },
    cancelText: { type: String, default: "返 回" },
    okBtn: { type: Boolean, default: true },
    okDisabled: { type: Boolean, default: false },    
    okText: { type: String, default: "提 交" },
    okLoading: { type: Boolean, default: false },
    btnPosition: { type: String, default: "right" }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    ok() {
      this.$emit("ok");
    }
  }
};
</script>
<style lang="scss" scoped>
hr {
  margin: 24px 0;
  border-top: 1px solid #e1e1e1;
}
.desc-title {
  color: #2e2e2e;
  font-weight: 600;
}
.desc-content {
  font-size: 14px;
  line-height: 1.428571429;
  color: #2e2e2e;
}
.oper-btn {
  padding: 12px 24px;
}
.form-page-box {
  display: flex;
  padding-top: 15px;
  justify-content: center;
}
.form-page-desc {
  width: 200px;
  text-align: left;
}
.form-page-innerbox {
  padding: 20px;
  text-align: left;
}
.form-page-oper-bar {
  text-align: right;
  height: 38px;
}

@media screen and (max-width: 1200px) {
  .form-page-box {
    padding: 30px;
    flex-direction: column;
  }
  .form-page-desc {
    width: auto;
  }
  .form-page-innerbox {
    margin-left: 0;
    padding: 0;
  }
}
</style>
