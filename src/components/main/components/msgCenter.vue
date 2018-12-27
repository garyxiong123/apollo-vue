<template>
    <div class="tool-bar">
        <el-badge :value="200" :max="99" class="noti-badge">
            <i class="el-icon-bell"></i>
            <div class="noti-panel">
                <i class="top-arrow"></i>
                <div class="noti-header">消息通知</div>
                <ul class="noti-item-group">
                    <li class="noti-item">
                        <span>您已审核通过</span>
                        <el-button type="text">标记已读</el-button>
                    </li>
                    <li class="noti-item">
                        <span>您已审核通过</span>
                        <el-button type="text">标记已读</el-button>
                    </li>
                    <li class="noti-item">
                        <span>您已审核通过</span>
                        <el-button type="text">标记已读</el-button>
                    </li>
                    <li class="noti-item">
                        <span>您已审核通过</span>
                        <el-button type="text">标记已读</el-button>
                    </li>
                    <li class="noti-footer">
                        <el-button type="text">全部已读</el-button>
                    </li>
                </ul>
            </div>
        </el-badge>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../common/common.scss";
.tool-bar {
  float: right;
  margin-right: 30px;
  .noti-badge {
    margin-top: 12px;
    position: relative;
    &:hover .noti-panel {
      display: block;
    }
    .el-icon-bell {
      font-size: 30px;
      cursor: pointer;
    }
    .noti-panel {
      z-index: 2001;
      width: 400px;
      height: 379px;
      overflow: auto;
      text-align: left;
      position: absolute;
      border: 1px solid #ebeef5;
      border-top: none;
      top: 26px;
      right: -20px;
      display: none;
      .top-arrow {
        position: relative;
        left: 355px;
        @include top-full-arrow(#3e81e0);
      }
      .noti-header {
        height: 50px;
        color: #fff;
        line-height: 50px;
        padding-left: 20px;
        margin-top: -4px;
        background: linear-gradient(to right, #4287e5 0%, #3e84e7 100%);
      }
      .noti-item-group {
        height: 300px;
        overflow: auto;
        background: #fff;
      }
      .noti-item {
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
        display: flex;
        justify-content: space-between;
        &:hover {
          cursor: pointer;
        }
      }
      .noti-footer {
        text-align: center;
        background: #fff;
      }
    }
  }
}
</style>
