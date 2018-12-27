<template>
    <div class="pag">
        <el-pagination layout="total,prev, pager, next" :total="total" :current-page="current" :page-size="20" @current-change="changePage" />
    </div>
</template>
<script>
export default {
    props:{
        total:Number,
        current:Number,
    },
    methods:{
        changePage(current){
            this.$emit('change',current)
        }
    }
};
</script>
<style lang="scss" scoped>
.pag {
  text-align: right;
  margin-top: 10px;
}
</style>
