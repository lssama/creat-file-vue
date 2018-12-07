<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './assets/css/main.less';
  body {
    background-color: rgb(233, 233, 233);
  }
  *{
    padding: 0;
    margin: 0;
  }
  #app {
    font-family:'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    // color: #fff;
  }
  .icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
  }
</style>
