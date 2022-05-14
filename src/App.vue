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
  #app {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 15px 0px;
    border-radius: 20px;
  }
  .desktop {
    border-top: 50px solid #f4f6f8;
    border-bottom: 50px solid #f4f6f8;
    border-left: 20px solid #f4f6f8;
    border-right: 20px solid #f4f6f8;
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
      border: 1px solid #ebebeb;
    }
  }
}
</style>
