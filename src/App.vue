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
@import "~@/assets/css/transtion.scss";
#app {
  max-width: 768px;
  height: 100vh;
  margin: auto;
}
</style>
