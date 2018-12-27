<template>
    <el-form inline class="region-box">
      <el-form-item label="省：">
         <el-select filterable @change="changePro" v-model="codeObj.pro">
            <el-option v-for="item in provinceArr" :key="item.id" :label="item.name" :value="item.code"></el-option>
         </el-select>
         <div style="margin-top:10px;">
           <el-tag style="width:100%" v-if="codeObj.pro" type="success">{{`provice code:${codeObj.pro}`}}</el-tag>
         </div>
      </el-form-item>
      <el-form-item label="市：" style="margin:0 20px">
        <el-select filterable @change="changeCity" v-model="codeObj.city">
          <el-option v-for="item in cityArr" :key="item.id" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <div style="margin-top:10px;">
          <el-tag style="width:100%" v-if="codeObj.city" type="warning">{{`city code:${codeObj.city}`}}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="县/地区：">
        <el-select filterable v-model="codeObj.country">
          <el-option v-for="item in countryArr" :key="item.id" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <div style="margin-top:10px;">
          <el-tag style="width:100%" v-if="codeObj.country">{{`country code:${codeObj.country}`}}</el-tag>
        </div>
      </el-form-item>
    </el-form>
</template>
<script>
export default {
  data() {
    return {
      codeObj: {},
      provinceArr: [],
      cityArr: [],
      countryArr: []
    };
  },
  mounted() {
    this.getTop();
  },
  methods: {
    async getTop() {
      const res = await this.$base.getCountryCode();
      if (res) {
        const res2 = await this.getDataByCode(res.data);
        if (res2) {
          this.provinceArr = res2.data;
        }
      }
    },
    async getDataByCode(code) {
      return this.$base.getAreaDtos(code);
    },
    async changePro(val) {
      const res = await this.getDataByCode(val);
      if (res) {
        this.$delete(this.codeObj,'city');
        this.$delete(this.codeObj,'country');
        this.cityArr = res.data;
      }
    },
    async changeCity(val) {
      const res = await this.getDataByCode(val);
      if (res) {
        this.$delete(this.codeObj,'country');
        this.countryArr = res.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.region-box {
  display: flex;
  margin-top: 15%;
  justify-content: center;
}
</style>