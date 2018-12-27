<template>
    <div class="box">
        <h3>编辑特殊推荐位内容</h3>
         <el-form ref="editForm" :model="form" :rules="rules" label-width="150px">
            <div style="width:49%;float:left">
                <el-form-item prop="locationKey" label="配置Key">
                    <el-input v-model="form.locationKey"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item prop="iosAndroidLink" label="IOS、安卓跳转链接">
                    <el-input v-model="form.iosAndroidLink"></el-input>
                </el-form-item>
                <el-form-item prop="icon" label="图片">
                    <ImgUpload v-model="form.icon" />                                        
                </el-form-item>
            </div>
            <div style="width:49%;float:left">
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="buttonName" label="按钮名称">
                    <el-input v-model="form.buttonName"></el-input>
                </el-form-item>
                <el-form-item prop="link" label="跳转链接">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
                <el-form-item prop="rightUpContent" label="右上角内容">
                    <el-input v-model="form.rightUpContent"></el-input>
                </el-form-item>
                <el-form-item prop="leftUpTag" label="左上角标签">
                    <el-input v-model="form.leftUpTag"></el-input>
                </el-form-item>
                 <el-form-item prop="rightDownContent" label="右下角内容">
                    <el-input v-model="form.rightDownContent"></el-input>
                </el-form-item>
                <el-form-item prop="leftDownTag" label="左下角标签">
                    <el-input v-model="form.leftDownTag"></el-input>
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
        locationKey: [{ required: true, message: "必填", trigger: "blur" }],
        sort: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: cRule.validateNum,
            trigger: "blur"
          }
        ],
        iosAndroidLink: [{ required: true, message: "必填", trigger: "blur" }],
        name: [{ required: true, message: "必填", trigger: "blur" }],
        buttonName: [{ required: true, message: "必填", trigger: "blur" }],
        link: [{ required: true, message: "必填", trigger: "blur" }]
      },
      loading: false
    };
  },
  components: {
    ImgUpload
  },
  created() {
    this.form = JSON.parse(sessionStorage.getItem("nowSpePositionM"));
  },
  methods: {
    handleSure() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.runAdd();
        }
      });
    },
    async runAdd() {
      this.loading = true;
      const res = await this.$base.updateSpeRecPosition(this.form);
      this.loading = false;
      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/ad/specialContentM");
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
