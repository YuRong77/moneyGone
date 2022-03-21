<template>
  <div class="setting">
    <div class="header">
      <h3 class="font-18">{{ $t("LC_MY_SETTING") }}</h3>
    </div>
    <div class="content">
      <div class="setup boxShadow">
        <div class="setItem" @click="editName()">
          <div class="icon"><i class="fas fa-user-circle"></i></div>
          <div class="text">{{ $t("LC_NICKNAME") }}</div>
          <div class="control">
            <span>{{ memberInfo.name }} </span>
            <span><i class="fas fa-angle-right"></i></span>
          </div>
        </div>
        <div class="setItem" @click="editLang()">
          <div class="icon"><i class="fas fa-globe"></i></div>
          <div class="text">{{ $t("LC_LANG") }}</div>
          <div class="control">
            <span>{{ getLang() }} </span>
            <span><i class="fas fa-angle-right"></i></span>
          </div>
        </div>
        <div class="setItem">
          <div class="icon"><i class="fas fa-adjust"></i></div>
          <div class="text">{{ $t("LC_THEME") }}</div>
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
          <div class="text">{{ $t("LC_LOGOUT") }}</div>
          <div class="control">
            <div class="logoutBtn cancelBtn btn" @click="logout()">
              {{ $t("LC_LOGOUT") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditNamePopup
      v-if="editNamePopup"
      :editNamePopup.sync="editNamePopup"
      :name="memberInfo.name"
    />
    <EditLangPopup
      v-if="editLangPopup"
      :editLangPopup.sync="editLangPopup"
      :lang.sync="lang"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditNamePopup from "@/components/popup/editNamePopup.vue";
import EditLangPopup from "@/components/popup/editLangPopup.vue";
export default {
  components: {
    EditNamePopup,
    EditLangPopup,
  },
  data() {
    return {
      lang: sessionStorage.getItem("lang"),
      editNamePopup: false,
      editLangPopup: false,
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
    ...mapState("memberInfo", ["memberInfo"]),
  },
  methods: {
    editName() {
      this.editNamePopup = true;
    },
    editLang() {
      this.editLangPopup = true;
    },
    setTheme(val) {
      const data = {
        theme: val,
      };
      this.$store.commit("setting/SET_THEME", val);
      this.$store
        .dispatch("setting/changeTheme", data)
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
      //change theme color
      const color = val === "lightMode" ? "#f2f4f8" : "#677685";
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      metaThemeColor.setAttribute("content", color);
    },
    logout() {
      sessionStorage.removeItem("Authorization");
      localStorage.removeItem("a");
      localStorage.removeItem("p");
      location.reload();
    },
    getLang() {
      if (this.lang === "zh-TW") return "繁體中文";
      if (this.lang === "zh-CN") return "简体中文";
      if (this.lang === "en-US") return "English";
      if (this.lang === "ja-JP") return "日本語";
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
            transition: background 0.4s;
            background: #313f4c;
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