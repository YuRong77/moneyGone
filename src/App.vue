<template>
  <div id="app" class="lightMode">
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

<style lang="scss">
@import "~@/assets/css/theme.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: rgb(235, 235, 235);
}
#app {
  max-width: 768px;
  height: 100vh;
  margin: auto;
}
</style>
