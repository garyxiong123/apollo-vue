<template>
    <div>
        <img v-if="src" @click="showModal" class="img" :src="src" />
    </div>    
</template>
<script>
export default {
  props: {
    src: String
  },
  methods: {
    showModal() {
      this.$alert(`<img src=${this.src} style="width:100%" />`, "查看图片", {
        dangerouslyUseHTMLString: true,
        customClass: "img-box-container",
        showConfirmButton: false,
        confirmButtonText: "确定",
        closeOnClickModal: true,
        closeOnPressEscape: true
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  cursor: pointer;
  width: 80px;
  height: 40px;
}
</style>
