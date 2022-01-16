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
      this.axios
        .post(`${process.env.VUE_APP_API_PATH}/api/index/login`, data)
        .then((res) => {
          const result = res.data.result;
          sessionStorage.setItem("uid", result.uid);
          sessionStorage.setItem("lang", result.setting.language);
          sessionStorage.setItem("theme", result.setting.theme);
          this.$store.commit("setting/SET_THEME", result.setting.theme);
          this.$store.commit("setting/SET_LANG", result.setting.language);
          this.$router.push("/home");
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