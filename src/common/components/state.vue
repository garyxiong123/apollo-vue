<template>
    <svg>
        <rect :style="{width:size,height:size*1.3,fill:stateColor}" />
    </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 20
    },
    type: {
      type: String,
      default: "danger"
    }
  },
  computed: {
    stateColor() {
      const type = this.type;
      let color = "";
      switch (type) {
        case "success":
          color = "green";
          break;
        case "danger":
          color = "#fbb305";
          break;
        case "error":
          color = "red";
          break;
      }
      return color;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
