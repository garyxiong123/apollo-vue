<template>
    <div class="box">
        <h3>编辑推荐位内容</h3>
         <el-form ref="editForm" :model="form" :rules="rules" label-width="120px">
            <div style="width:49%;float:left">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="subheadings" label="副标题">
                    <el-input v-model="form.subheadings"></el-input>
                </el-form-item>
                <el-form-item prop="endTime" label="结束日期">
                        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间" />
                </el-form-item>
                 <el-form-item prop="description" label="描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                 <el-form-item prop="feature" label="特点">
                    <el-input v-model="form.feature"></el-input>
                </el-form-item>
                 <el-form-item prop="contentCondition" label="条件">
                    <el-input v-model="form.contentCondition"></el-input>
                </el-form-item>
                 <el-form-item prop="remark1" label="备注1">
                    <el-input v-model="form.remark1"></el-input>
                </el-form-item>
                 <el-form-item prop="sort" label="排序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                 <el-form-item prop="linkType" label="跳转类型">
                     <el-select v-model="form.linkType" @change="changeLinkType" clearable placeholder="请选择">
                        <el-option v-for="item in allLinkType" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="link" label="跳转链接">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
                 <el-form-item prop="iosParam" label="IOS参数">
                    <el-input v-model="form.iosParam"></el-input>
                </el-form-item>
                <el-form-item prop="iosLink" label="IOS跳转链接">
                    <el-input v-model="form.iosLink"></el-input>
                </el-form-item>
                 <el-form-item prop="param" label="参数">
                    <el-input v-model="form.param"></el-input>
                </el-form-item>
                 <el-form-item prop="buttonUrl" label="按钮跳转链接">
                    <el-input v-model="form.buttonUrl"></el-input>
                </el-form-item>
                <el-form-item prop="markImg" label="角标">
                   <ImgUpload v-model="form.markImg" />              
                </el-form-item>
                <el-form-item prop="imageImg" label="图片">
                    <ImgUpload v-model="form.imageImg" />                  
                </el-form-item>
            </div>
            <div style="width:49%;float:left">
                <el-form-item prop="headings" label="标题">
                    <el-input v-model="form.headings"></el-input>
                </el-form-item>
                <el-form-item prop="beginTime" label="开始日期">
                    <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择日期时间" />                        
                </el-form-item>
                <el-form-item prop="isLogin" label="是否需要登陆">
                    <el-select v-model="form.isLogin" placeholder="请选择">
                        <el-option label="需要" value="true" />
                        <el-option label="不需要" value="false" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="content" label="内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item prop="tags" label="标签">
                    <el-input v-model="form.tags"></el-input>
                </el-form-item>
                <el-form-item prop="exposition" label="说明">
                    <el-input v-model="form.exposition"></el-input>
                </el-form-item>
                <el-form-item prop="flag" label="旗帜/标识">
                    <el-input v-model="form.flag"></el-input>
                </el-form-item>
                <el-form-item prop="remark2" label="备注2">
                    <el-input v-model="form.remark2"></el-input>
                </el-form-item>
                <el-form-item prop="statId" label="统计id">
                    <el-input v-model="form.statId"></el-input>
                </el-form-item>
                <el-form-item prop="androidLink" label="安卓跳转链接">
                    <el-input v-model="form.androidLink"></el-input>
                </el-form-item>
                <el-form-item prop="androidParam" label="安卓参数">
                    <el-input v-model="form.androidParam"></el-input>
                </el-form-item>
                <el-form-item prop="buttonName" label="按钮名称">
                    <el-input v-model="form.buttonName"></el-input>
                </el-form-item>
                <el-form-item prop="buttonColor" label="按钮颜色/色值">
                    <el-input v-model="form.buttonColor"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input style="visibility:hidden"></el-input>
                </el-form-item>
                 <el-form-item prop="iconImg" label="图标">
                    <ImgUpload v-model="form.iconImg" />
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
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
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
      allLinkType: [],
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
      this.form = JSON.parse(sessionStorage.getItem("nowPositionContent"));
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
    async getAllLinkType() {
      const res = await this.$base.getAllLinkType();
      if (res) {
        this.allLinkType = res.data;
      }
    },
    handleSure() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.runAdd();
        }
      });
    },
    async runAdd() {
      this.loading = true;
      this.form.positionId = this.$route.query.positionId;
      const res = await this.$base.updatePositionContent(this.form);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push({
          path: "/ad/positionM/content",
          query: { positionId: this.$route.query.positionId }
        });
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
