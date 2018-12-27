<template>
  <div id="app">
 <!--   <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  min-width: 960px;
  color: #797979;
  padding: 0 !important;
  margin: 0 !important;
  /*font-size: 13px;*/
  background: #f1f2f7;
  font-family: 'Open Sans', sans-serif;
}
</style>
