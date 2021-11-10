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
          // document.cookie = `session.uid=${res.data.result.uid}`;
          sessionStorage.setItem("uid", res.data.result.uid);
          // this.$store.commit("memberInfo/SET_MEMBER_INFO", res.data.result);
          this.$router.push("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // console.log(process.env.VUE_APP_API_PATH);
  },
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