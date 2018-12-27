<template>
    <div>
        <div v-for="item in children" :key="item.name">
            <el-submenu v-if="item.children.length" :index="item.path">
                <template slot="title">
                    <i :class="'iconfont icon-liebiao1'"></i>
                    <span v-if="!collapse">{{item.name}}</span>
                </template>
                <itemTree :collapse="collapse" :children="item.children"></itemTree>
            </el-submenu>
            <el-menu-item v-else :index="item.path">
                <i :class="'iconfont icon-liebiao1'"></i>
                <span :title="item.name" slot="title">{{ item.name.length>10?(item.name.slice(0,10)+'...'):item.name }}</span>
            </el-menu-item>
        </div>
    </div>
</template>
<script>
import itemTree from "./itemTree";
export default {
  name: "itemTree",
  props: {
    children: Array,
    collapse: Boolean
  },
  components: {
    itemTree
  }
};
</script>
<style lang="scss" scoped>
</style>
