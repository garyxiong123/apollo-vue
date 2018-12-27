<template>

  <section class="panel">
    <header class="panel-heading">
      项目信息

      <el-tooltip content="修改项目基本信息111" placement="top" effect="light">
       <span class="pull-right">
                                <a href="/app/setting.html?#/appid=ops-pms"
                                   style="margin-right: 5px;text-decoration:none;">
                                    <img src="../../../assets/img/edit.png" class="i-20 cursor-pointer">
                                </a>
                            </span>
      </el-tooltip>
    </header>
    <div class="panel-body">
      <table class="project-info">
        <tbody class="text-left">
        <tr>
          <th>AppId:</th>
          <td class="ng-binding">{{appBaseInfo.appId}}</td>
        </tr>
        <tr>
          <th>应用名:</th>
          <td>
            <small class="ng-binding">{{appBaseInfo.name}}</small>
          </td>
        </tr>
        <tr>
          <th>部门:</th>
          <td class="ng-binding">{{appBaseInfo.name}}</td>
        </tr>
        <tr>
          <th>负责人:</th>
          <td class="ng-binding">{{appBaseInfo.name}}</td>
        </tr>
        <tr>
          <th>邮箱:</th>
          <td>
            <small class="ng-binding">{{appBaseInfo.ownerEmail}}</small>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </section>

</template>
<script>
  export default {
    data() {
      return {
        appBaseInfo: {
          appId: "ops-gateway",
          name: "ops-gateway",
          orgInfo: "技术平台",
          ownerName: "gary",
          ownerEmail: "502238410"
        }
      };
    },

    mounted() {
      this.getAppBaseInfo();

    },
    methods: {
      getAppBaseInfo() {
        let applicationName = this.$route.params.appId;
        this.appBaseInfo = JSON.parse(localStorage.getItem('applications')).filter((item, index, array) => item.name == applicationName)[0]
      },

      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
  ;
</script>
<style>
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border: 1px solid #ddd;
  }

  .panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  /*.panel-body {*/
  /*padding: 15px;*/
  /*}*/

  .project-info {
    width: 100%;
  }

  table {
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

</style>
