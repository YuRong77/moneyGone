<template>
  <div class="setting">
    <div class="header">
      <h3>我的設定</h3>
    </div>
    <div class="content">
      <div class="setup">
        <div class="setItem">
          <div class="icon"><i class="fas fa-user-circle"></i></div>
          <div class="text">暱稱</div>
          <div class="control">
            <span>挖a名子 </span>
            <span><i class="fas fa-angle-right"></i></span>
          </div>
        </div>
        <div class="setItem">
          <div class="icon"><i class="fas fa-globe"></i></div>
          <div class="text">語言</div>
          <div class="control">
            <span>繁體中文 </span>
            <span><i class="fas fa-angle-right"></i></span>
          </div>
        </div>
        <div class="setItem">
          <div class="icon"><i class="fas fa-adjust"></i></div>
          <div class="text">主題</div>
          <div class="control">
            <button @click="setTheme('lightMode')">light</button>
            <button @click="setTheme('darkMode')">dark</button>
          </div>
        </div>
        <div class="setItem">
          <div class="icon"><i class="fas fa-sign-out-alt"></i></div>
          <div class="text">登出</div>
          <div class="control">
            <button @click="logout()">登出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setTheme(val) {
      this.$store.dispatch("setting/test", val);
    },
    logout() {
      sessionStorage.removeItem("uid");
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85px;
    background: white;
  }
  .content {
    flex: 1;
    padding: 5%;
    min-height: 100%;
    .setup {
      padding: 5px 20px;
      border-radius: 10px;
      background: white;
      .setItem {
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .icon {
          font-size: 24px;
          margin-right: 10px;
          color: #5e94c3;
        }
        .text {
          margin-right: auto;
        }
        .control {
        }
        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>