<template>
  <div>
    <el-row align="bottom">
      <el-col :span="12">

        <el-col :span="5" style="text-align: center  ;font-size: 20px;font-weight: bold;color: #797979;">
          {{namespaceInfo.baseInfo.namespaceName}}
        </el-col>
        <el-col :span="1"> &nbsp;</el-col>
        <el-col :span="3" style="background-color: #67C23A;text-align: center">{{namespaceInfo.format}}</el-col>
        <!--<span style="float:left;margin-left: 50px;text-align: center; font-size: 20px ">{{namespaceInfo.baseInfo.namespaceName}}</span>-->
        <!--<span style="float: left; margin: 10px">{{namespaceInfo.format}}</span>-->
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-edit">发布</el-button>
        <el-button type="success" icon="el-icon-share">回滚</el-button>
        <el-button type="warning" icon="el-icon-delete">发布历史</el-button>
        <el-button type="info" icon="el-icon-delete">灰度</el-button>
        <el-button type="danger" icon="el-icon-delete">删除NameSpace</el-button>
      </el-col>
    </el-row>

  </div>


</template>
<script>


  export default {
    data() {
      return {
        activeName: 'second',
        appBaseInfo: {
          appId: "ops-gateway",
          name: "ops-gateway",
          orgInfo: "技术平台",
          ownerName: "gary",
          ownerEmail: "502238410"
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    props: {
      namespaceInfo: Object
    }
  };
</script>
<style>

  .el-row {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
