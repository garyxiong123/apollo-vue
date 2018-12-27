<template>
    <svg class="svg" :style="{width:size*2,height:size*2,background:bgColor}">
        <circle class="circle" :style="{strokeDasharray:dasharray,strokeWidth:size+'px',stroke:activeColor}" :r="size/2" :cx="size" :cy="size" :fill="bgColor"/>
    </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 50
    },
    bgColor: {
      type: String,
      default: "yellowgreen"
    },
    activeColor: {
      type: String,
      default: "#655"
    },
    rate: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dasharray() {
      const peri = Math.ceil(Math.PI * this.size);
      return `${peri * this.rate} ${peri * (1 - this.rate)}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.svg {
  transform: rotate(-90deg);
  border-radius: 50%;
}
.circle {
  stroke-dasharray: 50 108;
}
</style>

