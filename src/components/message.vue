<template>
  <transition name="messageShow">
    <div class="message" :class="state" v-show="message">
      <div class="text font-14">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      state: "",
    };
  },
  methods: {
    showMessage(msg) {
      this.message = msg;
      setTimeout(() => {
        this.message = "";
        this.state = "";
      }, 2500);
    },
  },
  created() {
    this.$bus.$on("sendMessage", (msg, state) => {
      this.state = state;
      this.showMessage(msg);
    });
  },
};
</script>

<style lang="scss" scoped>
.message {
  width: 100%;
  height: 30px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 100;
  .text {
    color: white;
    font-weight: bold;
  }
}
.message.success {
  background: #48a1ed;
}
.message.error {
  background: #ff5959;
}
.message.unverified {
  background: #ffb102;
}
</style>