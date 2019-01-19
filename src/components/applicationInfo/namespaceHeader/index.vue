<template>
  <div>
    <el-row align="bottom">
      <el-col :span="9">
        <div class="tag-class">
          <el-tag> {{namespaceInfo.baseInfo.namespaceName}}</el-tag>
          <el-tag type="success">{{namespaceInfo.format}}</el-tag>
          <el-badge v-if="namespaceInfo.itemModifiedCnt > 0" :value="namespaceInfo.itemModifiedCnt" class="item"
                    type="warning">
            <el-button size="small">有修改</el-button>
          </el-badge>
        </div>


      </el-col>
      <el-col :span="15">
        <el-button size="small" type="primary" icon="el-icon-edit" @click="$emit('publish')">发布</el-button>
        <el-button size="small" type="success" icon="el-icon-share" @click="$emit('rollback')">回滚</el-button>
        <el-button size="small" type="warning" icon="el-icon-delete" @click="toPublishHistory">发布历史</el-button>
        <el-dropdown trigger="click" style="margin-left: 5px">
           <span class="el-dropdown-link">
              <i class="el-icon-delete" style="font-size: 20px"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <el-button size="small" type="danger" icon="el-icon-delete" @click="$emit('delete')">删除NameSpace
              </el-button>

            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

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
    props: {
      publishDialogVisible: false,
      namespaceInfo: Object

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      toPublishHistory() {

        //TODO fix env不改变
        let {appId, env, namespaceName, clusterName} = this.namespaceInfo.baseInfo;
        let path = `?env=${env}&clusterName=${clusterName}&namespaceName=${namespaceName}`;
        this.$router.push("/publishHistory/" + this.$route.params.appId + path);
      }

    }
  };
</script>
<style>
  .tag-class {
    float: left;
    margin-left: 38px;
  }

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
