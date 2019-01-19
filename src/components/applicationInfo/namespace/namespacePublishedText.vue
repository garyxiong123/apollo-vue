<template>
  <div class="textFont">
    <editor v-model="publishedText" @init="editorInit" lang="html" :theme="theme" width="100%" height="100"></editor>
  </div>
</template>

<script>

  import editor from "vue2-ace-editor";

  export default {
    data() {
      return {
        editor: {},
        theme: "eclipse"
      }
    },

    props: {
      publishedText: "",
      textEditReadOnly: false

    },
    watch: {
      textEditReadOnly: {
        handler(newValue, oldValue) {
          this.editor.setReadOnly(newValue);
          this.theme = "chrome";
        }

      }
    },

    components: {editor}
    ,

    methods: {


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
        require('brace/mode/javascript')    //language
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/theme/eclipse')
        require('brace/snippets/javascript') //snippet
        this.editor = editor;
      },


    }
  }
</script>
<style>

  .textFont {

  }

  .break-line {
    margin-top: 30px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
