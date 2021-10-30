<template>
  <div>
    <span>帳號</span>
    <input type="text" v-model="account" />
    <span>密碼</span>
    <input type="password" v-model="password" />
    <button @click="login">登入</button>
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
          document.cookie = `session.uid=${res.data.result.uid}`;
          sessionStorage.setItem("uid", res.data.result.uid);
          this.$router.push("/");
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
</style>