<template>
  <div class="login">
    <div class="loginBox">
      <div>
        <span>帳號</span>
        <input type="text" v-model="account" />
      </div>
      <div>
        <span>密碼</span>
        <input type="password" v-model="password" />
      </div>
      <button @click="login">登入</button>
    </div>
  </div>
</template>

<script>
import { POST } from "../tools/fetch";

export default {
  data() {
    return {
      account: "gcobc50335@gmail.com",
      password: "test123",
    };
  },
  methods: {
    login() {
      const data = {
        email: this.account,
        password: this.password,
      };
      POST(`${process.env.VUE_APP_API_PATH}/api/index/login`, data)
        .then((res) => {
          const result = res.result;
          sessionStorage.setItem("lang", result.setting.language);
          sessionStorage.setItem("theme", result.setting.theme);
          sessionStorage.setItem("Authorization", `Bearer ${result.token}`);
          this.$store.commit("setting/SET_THEME", result.setting.theme);
          this.$store.commit("setting/SET_LANG", result.setting.language);
          //set theme color
          const color =
            result.setting.theme === "lightMode" ? "#ffffff" : "#414f5c";
          const metaThemeColor = document.querySelector(
            "meta[name=theme-color]"
          );
          metaThemeColor.setAttribute("content", color);
          this.$router.push("/index/lobby");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {},
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>