<template>
    <div class="box">
        <div style="width:100%;height:100%;background:#fafafa;padding:15px;box-sizing:border-box">
            <operBar :navs="['返回上级','邮件详情']" />
            <el-form label-width="100px" style="margin-top:20px">
                <el-form-item label="发件人">
                    <span>{{emailData.fromUser}}</span>
                </el-form-item>
                <el-form-item label="收件人">
                    <span>{{emailData.toUser}}</span>
                </el-form-item>
                <el-form-item label="抄送">
                    <span>{{emailData.carbonCopy}}</span>
                </el-form-item>
                <el-form-item label="密件抄送">
                    <span>{{emailData.blindCarbonCopy}}</span>
                </el-form-item>
                <el-form-item label="标签">
                    <span>{{emailData.customTag}}</span>
                </el-form-item>
                <el-form-item label="主题">
                    <span>{{emailData.subject}}</span>
                </el-form-item>
                <el-form-item label="内容">
                    <pre class="content-box">{{emailData.contents}}</pre>
                </el-form-item>
            </el-form>
        </div>
    </div>    
</template>
<script>
export default {
  data() {
    return {
      emailData: {}
    };
  },
  created() {
    this.emailData = JSON.parse(sessionStorage.getItem("nowEmail"));
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 80%;
  min-width: 500px;
  margin: 10px auto;
  margin-top: 10px;
  background: #fff;
  border: 10px solid transparent;
  background: linear-gradient(white, white),
        repeating-linear-gradient(-45deg, red 0, red 10px, transparent 0, transparent 20px, #58a 0, #58a 30px, transparent 0, transparent 40px);
  background-clip: padding-box, border-box;
  background-origin: border-box;
  background-color:#eee;
}
.content-box {
  white-space: pre-line;
  text-align: top;
  padding-top: 0;
  margin: 0;
}
</style>
