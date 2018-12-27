<template>
  <div class="outer-box">
    <div class="box"></div>
    <div v-if="disabled" class="mem"></div>
  </div>
</template>

<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
export default {
  props: ["value", "mode", "modes", "disabled"],
  watch: {
    value: function(newValue) {
      if (!this.internalChange) {
        this.editor.set(newValue);
      }
    }
  },
  data() {
    return {
      editor: null,
      error: false,
      json: this.value,
      internalChange: false
    };
  },
  mounted() {
    var self = this;
    var mode = "tree";
    var modes = ["tree", "code", "form", "text", "view"];
    if (this.mode !== undefined) mode = this.mode;
    if (!this.modes !== undefined) modes = this.modes;
    var options = {
      mode: mode,
      modes: modes, // allowed modes
      onChange() {
        try {
          var json = self.editor.get();
          self.error = false;
          self.$emit("checkError", false);
        } catch (e) {
          self.error = true;
          self.$emit("checkError", true);
        }
        if (!self.error) {
          self.json = json;
          self.$emit("json-change", json);
          self.internalChange = true;
          self.$emit("input", json);
          self.$nextTick(function() {
            self.internalChange = false;
          });
        }
      },
      // onValidate: function(json) {
      //   var errors = [];

      //   if (json && json.container && !json.container.image) {
      //     errors.push({
      //       path: ["container"],
      //       message: "必须填写镜像"
      //     });
      //   }
      //   return errors;
      // }
    };
    this.editor = new JSONEditor(
      this.$el.querySelector(".box"),
      options,
      this.json
    );
  }
};
</script>

<style scoped>
.box {
  height: 100%;
  position: relative;
}
.mem {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  z-index: 5;
}
* >>> .jsoneditor-poweredBy {
  display: none;
}
* >>> .jsoneditor-menu {
  background-color: #555;
  border: none;
}
* >>> .jsoneditor.jsoneditor-mode-code {
  border: 1px solid #dbdee5;
}
</style>
