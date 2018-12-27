<template>
  <div>
    <div class="type">
      <el-radio-group @change="changeType" v-model="typeFilter.assetType">
        <el-radio-button v-for="item in typeArr" :key="item.val" :label="item.val">{{item.label}}</el-radio-button>
      </el-radio-group>
      <el-button class="filter-btn" v-if="typeFilter.assetType === 'Kvm'|| typeFilter.assetType === 'Docker'" @click="typeFilterShow">筛选{{filterText?`（${filterText}）`:''}}</el-button>
    </div>
    <div v-if="showTypePanel" class="type-filter-panel">
      <el-form ref="form" :model="typeFilter" :rules="rules" class="form" label-width="50px">
        <el-form-item v-if="typeFilter.assetType !== 'Docker'" label="CPU">
          <el-radio-group v-model="typeFilter.cpuKernels">
            <el-radio-button v-for="item in cpuArr" :key="item.val" :label="item.val">{{item.label}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="cpuKernels" v-else label="CPU">
          <el-input class="input" v-model="typeFilter.cpuKernels" placeholder="请输入">
            <span slot="append">核</span>
          </el-input>
        </el-form-item>
        <el-form-item v-if="typeFilter.assetType !== 'Docker'" label="内存">
          <el-radio-group v-model="typeFilter.memorySize">
            <el-radio-button v-for="item in ramArr" :key="item.val" :label="item.val">{{item.label}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="memorySize" v-else label="内存">
          <el-input class="input" v-model="typeFilter.memorySize" placeholder="请输入">
            <span slot="append">G</span>
          </el-input>
        </el-form-item>
        <el-form-item label="硬盘">
          <el-radio-group v-model="typeFilter.hardDiskSize">
            <el-radio-button v-for="item in hdArr" :key="item.val" :label="item.val">{{item.label}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div class="type-filter-oper">
          <el-button @click="cancelTypeFilter">取消</el-button>
          <el-button @click="handleTypeFilter" type="primary">确认</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import config from "@/common/data/orderConfig";
import rule from "@/common/rules";
export default {
  data() {
    return {
      filterText: "",
      typeFilter: {
        assetType: ""
      },
      typeArr: [
        { label: "全部", val: "" },
        { label: "KVM", val: "Kvm" },
        { label: "DOCKER", val: "Docker" },
        { label: "物理机", val: "Machine" }
      ],
      cpuArr: config.cpuArr,
      ramArr: config.ramArr,
      hdArr: config.hdArr,
      showTypePanel: false,
      rules: {
        cpuKernels: [
          {
            validator: rule.validateDot1,
            trigger: "blur"
          }
        ],
        memorySize: [
          {
            validator: rule.validateDot2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    changeType(val) {
      if (val === 'Machine' || !val) {
        this.showTypePanel = false;
      }
      this.typeFilter = {
        assetType: this.typeFilter.assetType
      };
      this.filterText = "";
      this.handleTypeFilterRun();
    },
    typeFilterShow() {
      this.showTypePanel = true;
    },
    cancelTypeFilter() {
      this.typeFilter = {
        assetType: this.typeFilter.assetType
      };
      this.showTypePanel = false;
    },
    handleTypeFilter() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.handleTypeFilterRun();
        }
      });
    },
    handleTypeFilterRun() {
      this.showTypePanel = false;
      let text = "";
      const reg = /^\s+$/;
      const conArr = [{name:'cpuKernels',text:"核CPU "},{name:'memorySize',text:"G内存 "},{name:'hardDiskSize',text:"G硬盘 "}];
      conArr.forEach((item)=>{
        if (this.typeFilter[item.name] && !reg.test(this.typeFilter[item.name])) {
        text += this.typeFilter[item.name] + item.text;
      }
      })
      this.filterText = text;
      this.$emit("setParam", this.typeFilter);
    }
  }
};
</script>
<style lang="scss" scoped>
.type {
  margin-top: 20px;
  height: 38px;
  position: relative;
}
.type-filter-panel {
  border: 1px solid #eee;
  width: 550px;
  padding: 20px;
  height: 220px;
  position: absolute;
  background: #fff;
  z-index: 5;
}
.type-filter-oper {
  text-align: right;
}
.form {
  width: 550px;
}
.filter-btn {
  padding: 10px 20px;
}
</style>
