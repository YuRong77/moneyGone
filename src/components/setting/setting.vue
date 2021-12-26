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
            <input type="checkbox" id="theme" v-model="isLightMode" />
            <label for="theme">
              <img src="@/assets/img/sun.svg" alt="" />
              <img src="@/assets/img/moon.svg" alt="" />
              <div class="switchBall"></div>
            </label>
          </div>
        </div>
        <div class="setItem">
          <div class="icon"><i class="fas fa-sign-out-alt"></i></div>
          <div class="text">登出</div>
          <div class="control">
            <div class="logoutBtn" @click="logout()">登出</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLightMode: null,
    };
  },
  watch: {
    isLightMode(newVal, oldVal) {
      if (oldVal === null) return;
      if (newVal) return this.setTheme("lightMode");
      return this.setTheme("darkMode");
    },
  },
  computed: {
    ...mapState("setting", ["theme"]),
  },
  methods: {
    setTheme(val) {
      const data = {
        theme: val,
      };
      this.$store.commit("setting/SET_THEME", val);
      this.$store.dispatch("setting/changeTheme", data);
    },
    logout() {
      sessionStorage.removeItem("uid");
      location.reload();
    },
  },
  created() {
    if (this.theme === "lightMode") {
      this.isLightMode = true;
    } else {
      this.isLightMode = false;
    }
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
    height: 75px;
    h3 {
      font-size: 18px;
    }
  }
  .content {
    flex: 1;
    padding: 5%;
    min-height: 100%;
    .setup {
      padding: 5px 20px;
      border-radius: 10px;
      .setItem {
        display: flex;
        align-items: center;
        padding: 15px 0;
        .icon {
          font-size: 24px;
          margin-right: 10px;
          color: #5e94c3;
        }
        .text {
          margin-right: auto;
        }
        .control {
          input {
            position: absolute;
            opacity: 0;
            &:checked + label {
              background: #5e94c3;
              & .switchBall {
                transform: translateX(33px);
              }
            }
          }
          label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 65px;
            height: 32px;
            padding: 0 6px;
            border-radius: 50px;
            transition: background 0.5s;
            background: #28333d;
            .switchBall {
              position: absolute;
              top: 3px;
              left: 3px;
              width: 26px;
              height: 26px;
              border-radius: 50%;
              background: white;
              transition: transform 0.2s;
            }
          }
          .logoutBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 36px;
            border-radius: 5px;
          }
        }
        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>