<template>
    <div class="tree-info">
        <div>
            <span class="rect1"></span>
            <span> ---- 个人权限</span>
        </div>
        <div>
            <span class="rect2"></span>
            <span> ---- 个人可分配权限</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.tree-info {
  position: absolute;
  background: #fff;
  right: 0;
  z-index: 5;
}
.rect1 {
  display: inline-block;
  position: relative;
  border: 1px solid #409eff;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
  vertical-align: middle;
}
.rect2 {
  display: inline-block;
  position: relative;
  border: 1px solid #f56c6c;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
  z-index: 1;
  vertical-align: middle;
}
</style>
