<template>
  <div v-loading="url&&loading">
    <iframe @load="loadIframe" sandbox="allow-same-origin allow-scripts allow-forms" v-if="url" :src='url' id="iframepage" style="width:100%;height:calc(100vh - 50px);margin-bottom: -4px;" frameborder="0"></iframe>
    <NoUrl v-else />
  </div>
</template>


<script>
import NoUrl from "./components/noUrl";
export default {
  data: () => {
    return {
      url: "",
      loading: true,
      tokenArr:['codeCreate','apollo']
    };
  },
  components: {
    NoUrl
  },
  created() {
    const pKey = this.$route.params.key;
    this.getUrl(pKey);
  },
  beforeRouteUpdate(to, from, next) {
    this.loading = true;
    this.getUrl(to.params.key);
    next();
  },
  methods: {
    getUrl(pKey) {
      const frameMap = JSON.parse(localStorage.getItem("frameMap"));
      const url = frameMap[pKey];
      this.url = this.tokenArr.includes(pKey)?`${url}?token=${localStorage.getItem('token')}`:url;
    },
    loadIframe() {
      this.loading = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.box {
  height: 100%;
}
</style>
