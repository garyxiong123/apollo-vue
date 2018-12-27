export default {
  watchHeight(that) {
    that.computeTableHeight1 = this.computeTableHeight.bind(that);
    this.computeTableHeight.call(that);
    window.addEventListener("resize", that.computeTableHeight1, false);
  },
  removeWatchHeight(that) {
    window.removeEventListener("resize", that.computeTableHeight1, false);
  },
  computeTableHeight() {
    const wHeight = document.documentElement.clientHeight;
    const height = wHeight - 60 - 80 - 32 - 45;
    this.tableMaxHeight = height;
  },
  romoveNullObj(obj) {
    const data = JSON.parse(JSON.stringify(obj));
    for (let item in data) {
      if (!data[item]) {
        delete data[item]
      }
    }
    return data;
  }
};
