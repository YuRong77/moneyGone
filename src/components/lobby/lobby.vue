<template>
  <div class="content lobby">
    <div class="main">
      <div class="memoList">
        <div class="memo">
          <div>777</div>
          <p>123</p>
        </div>
        <div class="addMemo">+</div>
      </div>
      <div class="spendType">
        <div class="type">123</div>
        <div class="type">123</div>
        <div class="type">123</div>
        <div class="type">123</div>
      </div>
    </div>
    <div class="spendList">3</div>
    <!-- <h1>HOME</h1>
    <h3>{{ $t("LC_ACCOUNT") }}</h3>
    <button @click="logout">登出</button>
    <button @click="getTest()">取得測試</button>
    <button @click="setTest()">編輯測試</button> -->
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

<style lang="scss" scoped>
.lobby {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 5% 5%;
  .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    .memoList {
      display: flex;
      flex: 1;
      background: rgba(244, 255, 149, 0.397);
      .memo {
        margin-right: 20px;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          background: #ffffff;
        }
        p {
          text-align: center;
        }
      }
      .addMemo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background: #456988;
      }
    }
    .spendType {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      flex: 4;
      background: rgba(255, 228, 187, 0.39);
      .type {
        width: 50%;
        background: rgba(128, 255, 0, 0.295);
      }
    }
  }
  .spendList {
    flex: 1;
    background: rgba(220, 253, 159, 0.445);
  }
}
</style>