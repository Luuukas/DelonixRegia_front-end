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

<style>
#app {
  /* background-image: url('../static/BG4.jpg'); */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* background-repeat: round; */
  height: 100%;
  width: 100%;
  /* position:absolute; */
}
</style>
