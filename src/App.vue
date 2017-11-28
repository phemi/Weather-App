<template>
  <div id="app">
  <div class="header">Weather Forecast</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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

.header {
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  text-align: 10px;
}

</style>
