<template>
  <section class="env-panel">
    <header class="env-panel-heading">
      环境列表

      <el-tooltip content="通过切换环境、集群来管理不同环境、集群的配置" placement="right" effect="light">
        <span class="pull-right">
                <img src="../../../assets/img/question.png" class="env-panel-head-pic">
        </span>
      </el-tooltip>
    </header>

    <div id="treeview" class="no-radius treeview">
      <ul>
        <li  v-bind:class="{ activess : selectItem === index }"
            v-for="(env, index ) in envs"
            @click="changeEnv(env, index)"
            v-on:select="changeColor">
          {{env.body.env}}
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        activeColor: '#428bca',
        envs: [],
        selectItem: 0

      };
    },
    mounted() {

      this.getEnv();

    },
    methods: {


      changeEnv(env, index) {
        this.selectItem = index;
        this.$router.push("/applicationInfo/" + this.$route.params.appId + "/" + env.body.env);
        //发送修改env事件
        this.$emit('changeEnv', 1, 2, 3)

      },

      changeColorBack(event) {
        event.target.style.backgroundColor = 'white'

      },
      changeColor(event) {
        event.target.style.backgroundColor = '#eff2f7'
        // this.style.background='#000';
        // console.log(target)
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
<style lang="scss" scoped>
  @import "../../../common/common.scss";

  .env-panel {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

    .activess {
      background-color: #428bca !important;
    }

    .env-panel-heading {
      border-color: #eff2f7;
    }

    .env-panel-head-pic {
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
      border-top: 0.1px solid #eff2f7;
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
      display: list-item;
      text-align: -webkit-match-parent;

      &:hover {
        background: #f0f8fd;
      }
      &:active {
        background-color: yellow;
      }
      &:visited {
        background-color: yellow;
      }
      &-success {
        background-color: pink;
      }
    }

  }
</style>
