<template>
  <div>
    <NameSpaceHeader :namespaceInfo="namespaceInfo" @publish="showPublish" @rollback="showRollback"
                     @delete="showDelete"></NameSpaceHeader>
    <div>
      <el-tabs v-model="activeName" type="border-card" style="border: 0px" @tab-click="handleClick">
        <el-tab-pane label="表格" name="table">
          <el-row class="aaa">
            <el-button size="mini" icon="el-icon-share">同步配置</el-button>
            <el-button type="primary" size="mini" icon="el-icon-delete">新增配置</el-button>
          </el-row>
          <NamespaceTable @changeEnv="getNamespaceInfos" :namespaceInfo="namespaceInfo"></NamespaceTable>
        </el-tab-pane>
        <el-tab-pane label="文本" name="text">
          <el-row class="aaa">

            <el-tooltip v-if="textEditReadOnly" class="item" effect="dark" content="复制配置" placement="bottom">
              <i class="el-icon-document icon-size"></i>
            </el-tooltip>

            <el-tooltip v-else class="item" effect="dark" content="取消修改" placement="bottom">
              <i class="el-icon-close icon-size" style="margin-left: 1px" @click="cancelSubmitText"></i>
            </el-tooltip>


            <el-tooltip v-if="textEditReadOnly" class="item" effect="dark" content="修改配置" placement="bottom">
              <i class="el-icon-edit-outline icon-size" style="margin-left: 1px" @click="textEdit()"></i>
            </el-tooltip>

            <el-tooltip v-else class="item" effect="dark" content="提交修改" placement="bottom">
              <i class="el-icon-check icon-size" style="margin-left: 1px" @click="submitText"></i>
            </el-tooltip>

          </el-row>
          <div class="textFont">
            <editor v-model="publishedText" @init="editorInit" :lang="lang" :theme="theme" width="100%"
                    height="100"></editor>
          </div>

        </el-tab-pane>
        <el-tab-pane label="更改历史" name="changeHistory">

          <ChangHistory v-for="(changeItemHistory, id) in changeItemsHistory" :key="id"
                        :items="changeItemHistory">
          </ChangHistory>
        </el-tab-pane>
        <el-tab-pane label="实例列表" name="instanceList">
        </el-tab-pane>
      </el-tabs>
    </div>


    <el-dialog :title="getTitle" :visible.sync="publishDialogVisible" width="70%">
      <el-form :model="publish">
        <el-form-item label="Changes" :label-width="formLabelWidth">
          <el-input v-if="!namespaceInfo.itemModifiedCnt" v-model="publish.change" autocomplete="off"></el-input>
          <PublishChangeTable v-if="namespaceInfo.itemModifiedCnt" :namespaceInfo="namespaceInfo"></PublishChangeTable>
        </el-form-item>

        <el-form-item label=" Release Name" :label-width="formLabelWidth">
          <el-input v-model="publish.releaseTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="comment" :label-width="formLabelWidth">
          <el-input v-model="publish.releaseComment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePublish">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="回滚" :visible.sync="rollbackDialogVisible" width="70%">
      <RollbackTable :namespaceInfo="namespaceInfo"></RollbackTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rollbackDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="handleRollback(namespaceInfo.currentReleaseId)">回 滚</el-button>
      </div>
    </el-dialog>


    <el-dialog title="删除namespace" :visible.sync="deleteDialogVisible" width="70%">
      <el-form :model="publish">
        <el-form-item label="Changes" :label-width="formLabelWidth">
          <el-input v-model="publish.change" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=" Release Name" :label-width="formLabelWidth">
          <el-input v-model="publish.releaseName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="comment" :label-width="formLabelWidth">
          <el-input v-model="publish.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>

  import NameSpaceHeader from "../namespaceHeader/index";
  import NamespaceTable from "./namepaceTable";
  import ChangHistory from "./changHistory"
  import NamespacePublishedText from "./namespacePublishedText";
  import PublishChangeTable from "./publishChangeTable";
  import RollbackTable from "./rollbackTable";
  import editor from "vue2-ace-editor";


  export default {
    data() {
      return {
        lang:"html",
        editor: {},
        theme: "eclipse",
        publishedText: "",
        textEditReadOnly: true,
        changeItemsHistory: [],
        activeName: 'table',
        publishDialogVisible: false,
        rollbackDialogVisible: false,
        deleteDialogVisible: false,
        formLabelWidth: '120px',
        title: "",
        publish: {
          releaseTitle: '',
          releaseComment: '',
          isEmergencyPublish: false,
          change: ''
        },
        form: Object
      };
    },
    props: {
      namespaceInfo: Object,
    },
    methods:
      {
        textEdit() {
          this.editor.setReadOnly(false);
          this.theme = "chrome";
          this.textEditReadOnly = false;
          this.lang = "yaml";


        },

        editorInit: function (editor) {
          editor.setOptions({
            fontSize: 13,
            minLines: 10,
            maxLines: 20
          }),
            //设置只读（true时只读，用于展示代码）
            editor.setReadOnly(true);
          editor.$blockScrolling = Infinity;
          editor.showPrintMargin = false;
          require('brace/ext/language_tools') //language extension prerequsite...
          require('brace/mode/html')
          require('brace/mode/yaml')
          require('brace/mode/python')
          require('brace/mode/javascript')    //language
          require('brace/mode/less')
          require('brace/theme/chrome')
          require('brace/theme/eclipse')
          require('brace/theme/github')
          require('brace/theme/dracula')
          require('brace/theme/ambiance')


          require('brace/snippets/javascript') //snippet
          this.editor = editor;
        },
        parsePropertiesText: function (namespace) {
          var result = "";
          var itemCnt = 0;
          namespace.items.forEach(function (item) {
            //deleted key
            if (!item.item.dataChangeLastModifiedBy) {
              return;
            }
            if (item.item.key) {
              //use string \n to display as new line
              var itemValue = item.item.value.replace(/\n/g, "\\n");

              result +=
                item.item.key + " = " + itemValue + "\n";
            } else {
              result += item.item.comment + "\n";
            }
            itemCnt++;
          });

          namespace.itemCnt = itemCnt;
          return result;
        },
        handleClick(tab, event) {
          // console.log(tab, event);
        },
        async submitText() {
          let data = {
            configText: this.publishedText,
            format: this.namespaceInfo.format,
            namespaceId: this.namespaceInfo.baseInfo.id
          }
          let res = await this.$auth.updateItems(this.namespaceInfo, data);
        },
        cancelSubmitText() {
          this.textEditReadOnly = true;
          this.editor.setReadOnly(true);
          // this.theme = "ambiance";
          this.lang = "html";



        },
        async handlePublish(tab, event) {
          let res = await this.$auth.commitRelease(this.namespaceInfo.baseInfo, this.publish);
          this.publishDialogVisible = false;
          location.reload();

        },
        showPublish(tab, event) {
          this.publish.change = "配置没有变化";
          this.publish.releaseTitle = new Date().Format("yyyyMMddhhmmss") + "-release";
          this.publishDialogVisible = true;

        },

        showDelete(tab, event) {
          this.publish.change = "配置没有变化";
          this.publish.releaseName = "123";
          this.deleteDialogVisible = true;

        },
        async handleDelete(tab, event) {
          let res = await this.$auth.deleteItem(this.namespaceInfo.baseInfo, id);

          this.publish.change = "配置没有变化";
          this.publish.releaseName = "123";
          this.deleteDialogVisible = false;

        },
        async handleRollback(releaseId) {
          let res = await this.$auth.rollbackByreleasesId(this.namespaceInfo.baseInfo, releaseId);

          this.rollbackDialogVisible = false;
          location.reload();


        },
        showRollback(tab, event) {
          this.publish.change = "配置没有变化";
          this.publish.releaseName = "123";
          this.rollbackDialogVisible = true;

        },
        async getChangeItemsHistory() {

          let {appId, env, namespaceName, clusterName} = this.namespaceInfo.baseInfo;
          let res = await this.$auth.getChangeHistoryByNameapaceAndApplicationAndEnvInPage(appId, env, namespaceName, clusterName)
          this.changeItemsHistory = res.data;
        },

        getNamespaceInfos() {
          this.$emit('changeEnv');
        }
      }
    ,
    computed: {
      getTitle() {
        this.title = "发布 (只有发布过的配置才会被客户端获取到，此次发布只会作用于当前环境:" + this.namespaceInfo.baseInfo.env + ")";
      }

    },
    mounted() {
      this.getChangeItemsHistory();
      this.publishedText = this.parsePropertiesText(this.namespaceInfo);

    },
    components: {
      NameSpaceHeader,
      NamespaceTable,
      ChangHistory,
      NamespacePublishedText,
      PublishChangeTable,
      RollbackTable,
      editor
    }
  }
  ;
</script>
<style>

  .icon-size {
    margin-left: 20px;
    font-size: 27px;
    cursor: pointer;
  }

  .aaa {
    color: #000;
    position: absolute;
    top: -45px;
    right: 50px;
    display: inline-block;
  }

  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border: 1px solid #ddd;
  }

  .el-tabs__content {
    overflow: visible;
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

  .project-info {
    width: 100%;
  }

  table {
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

</style>
