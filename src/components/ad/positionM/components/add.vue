<template>
    <div class="box">
        <h3>新建推荐位</h3>
        <el-form ref="addForm" :model="form" :rules="rules" label-width="120px">
            <div style="width:49%;float:left">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="subheadings" label="副标题">
                    <el-input v-model="form.subheadings"></el-input>
                </el-form-item>
                <el-form-item prop="endTime" label="结束日期">
                    <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" />
                </el-form-item>
                <el-form-item prop="positionStatus" label="临时推荐位">
                    <el-select v-model="form.positionStatus" placeholder="请选择">
                         <el-option v-for="(item,id) in statusData" :key="id" :label="item" :value="id" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="statId" label="统计id">
                    <el-input v-model="form.statId"></el-input>
                </el-form-item>
                <el-form-item prop="link" label="跳转链接">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
                <el-form-item prop="linkType" label="跳转类型">
                    <el-select v-model="form.linkType" @change="changeLinkType" clearable placeholder="请选择">
                        <el-option v-for="item in allLinkType" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="param" label="参数">
                    <el-input v-model="form.param"></el-input>
                </el-form-item>
                <el-form-item prop="icon" label="ICON">
                    <ImgUpload v-model="form.icon" />     
                </el-form-item>
            </div>
            <div style="width:49%;float:left">
                <el-form-item prop="headings" label="标题">
                    <el-input v-model="form.headings"></el-input>
                </el-form-item>
                <el-form-item prop="beginTime" label="开始日期">
                    <el-date-picker v-model="form.beginTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" />                        
                </el-form-item>
                <el-form-item prop="packageType" label="APP类型">
                    <el-select v-model="form.packageType" placeholder="请选择">
                        <el-option v-for="(item,id) in allType" :key="id" :label="item" :value="id" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="positionGroup" label="推荐位组">
                    <el-input v-model="form.positionGroup"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item prop="locationKey" label="推荐位Key">
                    <el-input v-model="form.locationKey"></el-input>
                </el-form-item>
                <el-form-item prop="androidLink" label="安卓跳转链接">
                    <el-input v-model="form.androidLink"></el-input>
                </el-form-item>
                <el-form-item prop="androidParam" label="安卓参数">
                    <el-input v-model="form.androidParam"></el-input>
                </el-form-item>
                <el-form-item prop="iosLink" label="IOS跳转链接">
                    <el-input v-model="form.iosLink"></el-input>
                </el-form-item>
                <el-form-item prop="iosParam" label="IOS参数">
                    <el-input v-model="form.iosParam"></el-input>
                </el-form-item>
            </div>
            <div style="clear:both"></div>
        </el-form>
        <div class="operbar">
            <el-button @click="()=>$router.back()">取消</el-button>
            <el-button :loading="loading" @click="handleSure" type="primary">提交</el-button>
        </div>
    </div>
</template>
<script>
import ImgUpload from "@/common/components/imgUpload";
import cRule from "@/common/rules";
export default {
  data() {
    return {
      form: {},
      allType: {},
      statusData: {},
      allLinkType: [],
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        headings: [{ required: true, message: "必填", trigger: "blur" }],
        locationKey: [{ required: true, message: "必填", trigger: "blur" }],
        statId: [
          {
            validator: cRule.validateNum,
            trigger: "blur"
          }
        ],
        sort: [
          {
            validator: cRule.validateNum,
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  components: {
    ImgUpload
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPackageType();
      this.getPositionStatus();
      this.getAllLinkType();
    },
    changeLinkType(data) {
      let text = "";
      this.allLinkType.forEach(item => {
        if (item.key === data) {
          text = item.url;
        }
      });
      this.$set(this.form, "link", text);
    },
    async getPackageType() {
      const res = await this.$base.getAllPackageType();
      if (res) {
        this.allType = res.data;
      }
    },
    async getPositionStatus() {
      const res = await this.$base.getPositionStatus();
      if (res) {
        this.statusData = res.data;
      }
    },
    async getAllLinkType() {
      const res = await this.$base.getAllLinkType();
      if (res) {
        this.allLinkType = res.data;
      }
    },
    handleSure() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.runAdd();
        }
      });
    },
    async runAdd() {
      this.loading = true;
      const res = await this.$base.saveRecommendPosition(this.form);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/ad/positionM");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: calc((100vw - 420px) * 0.8);
  min-width: 880px;
  margin: 10px auto;
  padding: 15px;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.operbar {
  text-align: right;
}
</style>
