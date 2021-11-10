<template>
  <div class="content lobby">
    <h1>HOME</h1>
    <h3>{{ $t("LC_ACCOUNT") }}</h3>
    <button @click="logout">登出</button>
    <button @click="getTest()">取得測試</button>
    <button @click="setTest()">編輯測試</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      sessionStorage.removeItem("uid");
      document.cookie = `session.uid= `;
    },
    getTest() {
      const uid = sessionStorage.getItem("uid");
      this.axios
        .get(`${process.env.VUE_APP_API_PATH}/api/member/getMemberInfo/${uid}`)
        .then((res) => {
          console.log(res.data);
        });
    },
    setTest() {
      // const data = {};
      // this.axios
      //   .post(
      //     `${process.env.VUE_APP_API_PATH}/api/spendRecord/updateSpend`,
      //     data
      //   )
      //   .then((res) => {
      //     console.log(res.data);
      //   });
    },
  },
};
</script>

<style>
</style>