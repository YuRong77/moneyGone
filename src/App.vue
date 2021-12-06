<template>
  <div id="app" :class="theme">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("setting", ["theme"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/theme.scss";
@import "~@/assets/css/common.scss";
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
