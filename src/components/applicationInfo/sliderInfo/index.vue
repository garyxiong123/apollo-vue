<template>
  <section class="panel">
    <header class="panel-heading">
      环境列表

      <el-tooltip content="通过切换环境、集群来管理不同环境、集群的配置" placement="right" effect="light">
        <span class="pull-right">
                <img src="../../../assets/img/question.png" class="i-20">
                            </span>
      </el-tooltip>

    </header>

    <div id="treeview" class="no-radius treeview">
      <ul class="list-group">
        <li class="list-group-item node-treeview" v-for="(env, id ) in envs" v-on:click="changeEnv(env)">
          <span class="icon expand-icon"></span><span class="icon node-icon"></span>{{env.body.env}}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second',
        envs: []
      };
    },
    mounted() {

      this.getEnv();

    },
    methods: {
      changeEnv(env) {

        this.$router.push( "/applicationInfo/"+ this.$route.params.applicationName +"/"+ env.body.env);
        //发送修改env事件
        this.$emit('changeEnv',1,2,3)

      },

      async getEnv() {
        const res = await this.$auth.getAllEnv(this.$route.params.applicationName);
        this.envs = res.entities;
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
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }

  .panel-heading {
    border-color: #eff2f7;
    font-size: 16px;
    font-weight: 300;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-color: #eff2f7;
  }

  .i-20 {
    height: 20px;
    width: 20px;
  }

  .no-radius {
    border-radius: 0;
  }

  .pull-right {
    float: right !important;
  }

  .treeview .list-group-item {
    cursor: pointer;
  }

  .list-group-item:first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  .node-treeview {
    color: #797979;
  }

  ul, li {
    padding: 0;
    margin: 0;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
</style>
