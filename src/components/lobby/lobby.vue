<template>
  <div class="content lobby">
    <div class="main">
      <div class="memoList">
        <div class="memo" v-for="item in memo" :key="item.id">
          <div>icon</div>
          <p>{{ item.title }}</p>
        </div>
        <div class="addMemo">+</div>
      </div>
      <div class="spendType">
        <div class="type">123</div>
        <div class="type">456</div>
      </div>
      <div class="spendType">
        <div class="type">123</div>
        <div class="type">456</div>
      </div>
    </div>
    <div class="spendList">
      <h4>123</h4>
      <div class="list">
        <div
          class="listItem"
          v-for="(item, index) in memberInfo.spendList"
          :key="index"
        >
          <div class="itemInfo">
            <div>icon</div>
            <div>
              <h3>{{ item.name }}</h3>
              <span>{{ item.type }}</span>
            </div>
          </div>
          <div class="itemSpend">NT {{ item.spend }}</div>
        </div>
      </div>
    </div>
    <!-- <h1>HOME</h1>
    <h3>{{ $t("LC_ACCOUNT") }}</h3>
    <button @click="logout">登出</button>
    <button @click="getTest()">取得測試</button>
    <button @click="setTest()">編輯測試</button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("memberInfo", ["memberInfo"]),
    ...mapState("memo", ["memo"]),
  },
  methods: {
    logout() {
      sessionStorage.removeItem("uid");
      document.cookie = `session.uid= `;
    },
    getTest() {
      // const uid = sessionStorage.getItem("uid");
      // this.axios
      //   .get(`${process.env.VUE_APP_API_PATH}/api/member/getMemberInfo/${uid}`)
      //   .then((res) => {
      //     console.log(res.data);
      //   });
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
  // box-sizing: border-box;
  padding: 5% 5%;
  .main {
    display: flex;
    flex-direction: column;
    .memoList {
      display: flex;
      margin-bottom: 6%;
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
      flex: 1;
      .type {
        background: #ffffff;
        width: 47%;
        height: 65px;
        border-radius: 20px;
        margin-bottom: 20px;
      }
    }
  }
  .spendList {
    flex: 1;
    position: relative;
    h4 {
      margin-bottom: 15px;
    }
    .list {
      position: absolute;
      left: 0;
      top: 30px;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      .listItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px;
        height: 60px;
        margin-bottom: 15px;
        padding: 0 20px;
        background: #ffffff;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        .itemInfo {
          display: flex;
          align-items: center;
          div {
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>