<template>
  <div id="app" :class="theme">
    <div class="desktop">
      <router-view class="myApp" />
    </div>
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
@media (min-width: 900px) {
  .desktop {
    background: radial-gradient(circle, #f9f9f9, #f1f1f1);
    box-shadow: 0 8px 24px 0 rgb(96 96 96 / 25%),
      inset -2px -2px 4px 0 rgb(118 118 118 / 25%), inset 2px 2px 4px 0 #fff;
    padding: 50px 20px;
    border-radius: 20px;
    &::before {
      content: "";
      display: block;
      height: 8px;
      width: 8px;
      background: #b3b3b3;
      border-radius: 50%;
      position: absolute;
      top: 22px;
      left: 50%;
      transform: translateX(-50%);
    }
    &::after {
      content: "";
      display: block;
      height: 20px;
      width: 20px;
      border: 2px solid #cfcfcf;
      border-radius: 50%;
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }
    .myApp {
      position: relative;
      border: 1px solid #ebebeb;
      box-shadow: -1px -1px 2px 0 rgb(50 78 112 / 15%), 2px 2px 4px 0 #fff;
    }
  }
}
</style>
