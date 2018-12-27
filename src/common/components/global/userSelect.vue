<template>
     <el-select :filterable="filterable" :multiple="multiple" @change="changeSel" v-model="sel">
        <el-option v-for="item in user" :key="item.id" :value="item.id" :label="item.realName">
            <span class="name">{{ item.realName }}</span>
            <span class="dept-name">{{item.deptName|getDept}}</span>
        </el-option>
    </el-select>
</template>
<script>
export default {
  data() {
    return {
      sel: "",
      canUpdate: true
    };
  },
  props: ["user", "value", "filterable", "multiple"],
  watch: {
    value(newValue) {
      if (this.canUpdate) {
        this.sel = newValue;
      }
    }
  },
  filters: {
    getDept(value) {
      return value
        .split(",")
        .slice(0, 2)
        .join("|");
    }
  },
  methods: {
    changeSel(val) {
      this.canUpdate = false;
      this.$emit("input", val);
      this.$nextTick(() => {
        this.canUpdate = true;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.name {
  float: left;
}
.dept-name {
  float: right;
  color: #8492a6;
  font-size: 13px;
  margin-left:20px;
  margin-right:20px;
}
</style>
