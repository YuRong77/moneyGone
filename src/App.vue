<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: rgb(175, 175, 175);
}
#app {
  max-width: 768px;
  height: 100vh;
  background: rgb(236, 236, 236);
  margin: auto;
}
</style>
