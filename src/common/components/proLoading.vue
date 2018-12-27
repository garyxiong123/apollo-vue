<template>
    <div class="box">
        <span class="text">查询中，请耐心等待</span>
    </div>
</template>

<style lang="scss" scoped>
@keyframes run {
  from {
    background-position: 20px 0;
  }
  to {
    background-position: 0;
  }
}
.box {
  position: relative;
  width: 50%;
  border-radius: 4px;
  animation: run 1s linear infinite;
  height: 20px;
  background-color: #007bff;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
}
.text {
  color: #eee;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

