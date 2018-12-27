<template>
    <div class="box">
        <h3>编辑模板图片</h3>
        <el-form ref="editForm" :model="form" :rules="rules" label-width="120px">
            <div style="width:49%;float:left">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="locationKey" label="推荐位Key">
                    <el-input v-model="form.locationKey"></el-input>
                </el-form-item>
                <el-form-item prop="linkType" label="跳转类型">
                    <el-select v-model="form.linkType" placeholder="请选择">
                        <el-option v-for="item in allLinkType" :key="item.key" :label="item.value" :value="item.key" />
                    </el-select>
                </el-form-item>
                 <el-form-item prop="link" label="跳转链接">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
                <el-form-item prop="iconImage1" label="模板1">
                    <ImgUpload v-model="form.iconImage1" />                    
                </el-form-item>
                <el-form-item prop="iconImage3" label="模板3">
                    <ImgUpload v-model="form.iconImage3" />
                </el-form-item>
                <el-form-item prop="iconImage5" label="模板5">
                    <ImgUpload v-model="form.iconImage5" />
                </el-form-item>
                <el-form-item prop="iconImage7" label="模板7">
                    <ImgUpload v-model="form.iconImage7" />                   
                </el-form-item>
            </div>
            <div style="width:49%;float:left">
                <el-form-item prop="headings" label="标题">
                    <el-input v-model="form.headings"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item prop="packageType" label="应用包类型">
                    <el-select v-model="form.packageType" placeholder="请选择">
                         <el-option v-for="(item,id) in allType" :key="id" :label="item" :value="id" />
                    </el-select>
               </el-form-item>
               <el-form-item label="">
                   <el-input style="visibility:hidden"></el-input>
               </el-form-item>
               <el-form-item prop="iconImage2" label="模板2">
                    <ImgUpload v-model="form.iconImage2" />                                                            
                </el-form-item>
                <el-form-item prop="iconImage4" label="模板4">
                    <ImgUpload v-model="form.iconImage4" />                                        
                </el-form-item>
                <el-form-item prop="iconImage6" label="模板6">
                    <ImgUpload v-model="form.iconImage6" />                    
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
import cRule from '@/common/rules';
export default {
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        headings: [{ required: true, message: "必填", trigger: "blur" }],
        locationKey: [{ required: true, message: "必填", trigger: "blur" }],
        sort: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: cRule.validateNum,
            trigger: "blur"
          }
        ],
        link: [{ required: true, message: "必填", trigger: "blur" }],
        linkType: [{ required: true, message: "必选", trigger: "change " }],
        packageType: [{ required: true, message: "必选", trigger: "change " }]
      },
      allType: {},
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
      this.form = JSON.parse(sessionStorage.getItem("nowIconTem"));
      if (this.form.packageType) {
        this.form.packageType = String(this.form.packageType);
      }
      this.getPackageType();
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
      const res = await this.$base.updateTemIcon(this.form);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/ad/iconM");
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
