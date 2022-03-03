<template>
  <div class="login">
    <div class="loginBox">
      <h2>登入</h2>
      <div class="loginForm">
        <div class="loginInput">
          <input type="text" v-model="account" />
        </div>
        <div class="loginInput">
          <input type="password" v-model="password" />
        </div>
        <div class="rememberPassword">
          <input type="checkbox" id="isRemember" />
          <label for="isRemember">test</label>
        </div>
        <div class="confirmBtn btn" @click="login()">登入</div>
        <div class="cancelBtn btn" @click="login(true)">測試帳號登入</div>
      </div>
    </div>
  </div>
</template>

<script>
import { POST } from "../tools/fetch";

export default {
  data() {
    return {
      account: "",
      password: "",
      testAccount: "gcobc50335@gmail.com",
      testPassword: "test123",
      isLoading: false,
    };
  },
  methods: {
    login(isTest = false) {
      if (this.isLoading) return;
      const data = {
        email: isTest ? this.testAccount : this.account,
        password: isTest ? this.testPassword : this.password,
      };
      this.isLoading = true;
      POST(`${process.env.VUE_APP_API_PATH}/api/index/login`, data)
        .then((res) => {
          this.isLoading = false;
          const result = res.result;
          sessionStorage.setItem("lang", result.setting.language);
          sessionStorage.setItem("theme", result.setting.theme);
          sessionStorage.setItem("Authorization", `Bearer ${result.token}`);
          this.$store.commit("setting/SET_THEME", result.setting.theme);
          this.$store.commit("setting/SET_LANG", result.setting.language);
          //set theme color
          const color =
            result.setting.theme === "lightMode" ? "#f2f4f8" : "#677685";
          const metaThemeColor = document.querySelector(
            "meta[name=theme-color]"
          );
          metaThemeColor.setAttribute("content", color);
          this.$router.push("/index/lobby");
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .loginBox {
    width: 300px;
    border-radius: 5px;
    background: white;
    box-shadow: 0 3px 20px rgb(124 124 124 / 30%);
    padding: 25px 0 40px 0;
    h2 {
      text-align: center;
      margin-bottom: 25px;
    }
    .loginForm {
      padding: 0 30px;
      .loginInput {
        margin-bottom: 10px;
        input {
          width: 100%;
          height: 40px;
          border: 1px solid black;
          padding: 5px 10px;
        }
      }
      .rememberPassword {
        margin-bottom: 30px;
      }
      .confirmBtn {
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }
      .cancelBtn {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>