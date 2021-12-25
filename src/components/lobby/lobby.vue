<template>
  <div class="lobby">
    <Header />
    <div class="main">
      <div class="operate">
        <div class="memoList">
          <div
            class="memo"
            v-for="item in memoList"
            :key="item.id"
            @click="openMemo(item)"
          >
            <div><i class="far fa-sticky-note"></i></div>
            <p>{{ item.title }}</p>
          </div>
          <div
            class="addMemo"
            v-if="memoList.length < 5"
            @click="openMemo(null)"
          >
            +
          </div>
        </div>
        <div class="spendType">
          <div class="type" @click="addSpend(1)">
            <img src="@/assets/img/life.svg" alt="" />
            <div class="text">{{ $t("LC_LIFE") }}</div>
          </div>
          <div class="type" @click="addSpend(2)">
            <img src="@/assets/img/fun.svg" alt="" />
            <div class="text">{{ $t("LC_FUN") }}</div>
          </div>
        </div>
        <div class="spendType">
          <div class="type" @click="addSpend(3)">
            <img src="@/assets/img/study.svg" alt="" />
            <div class="text">{{ $t("LC_STUDY") }}</div>
          </div>
          <div class="type" @click="addSpend(4)">
            <img src="@/assets/img/other.svg" alt="" />
            <div class="text">{{ $t("LC_OTHER") }}</div>
          </div>
        </div>
      </div>
      <div class="spendList">
        <h4>{{ $t("LC_SPEND_TODAY") }}</h4>
        <div class="list">
          <div
            class="listItem"
            v-for="(item, index) in memberInfo.spendList"
            :key="index"
          >
            <div class="itemInfo">
              <div class="icon"><i :class="getSpendIcon(item.type)"></i></div>
              <div>
                <h3>{{ item.name }}</h3>
                <span>{{ getType(item.type) }}</span>
              </div>
            </div>
            <div class="itemSpend">NT$ {{ item.spend }}</div>
          </div>
        </div>
      </div>
    </div>
    <MemoPopup
      v-if="memoPopup"
      :memoPopup.sync="memoPopup"
      :currentMemo="currentMemo"
    />
    <SpendPopup
      v-if="spendPopup"
      :spendPopup.sync="spendPopup"
      :spendType="spendType"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/lobby/header";
import MemoPopup from "@/components/popup/memoPopup";
import SpendPopup from "@/components/popup/spendPopup";
export default {
  components: {
    Header,
    MemoPopup,
    SpendPopup,
  },
  data() {
    return {
      memoPopup: false,
      currentMemo: {},
      spendPopup: false,
      spendType: null,
    };
  },
  computed: {
    ...mapState("memberInfo", ["memberInfo"]),
    ...mapState("memo", ["memoList"]),
  },
  methods: {
    openMemo(item) {
      this.currentMemo = item;
      this.memoPopup = true;
    },
    addSpend(type) {
      this.spendType = type;
      this.spendPopup = true;
    },
    getType(type) {
      if (type === 1) return this.$t("LC_LIFE");
      if (type === 2) return this.$t("LC_FUN");
      if (type === 3) return this.$t("LC_STUDY");
      if (type === 4) return this.$t("LC_OTHER");
    },
    getSpendIcon(type) {
      if (type === 1) return "fas fa-utensils";
      if (type === 2) return "fas fa-gamepad";
      if (type === 3) return "fas fa-graduation-cap";
      if (type === 4) return "fas fa-comment-dots";
    },
  },
};
</script>

<style lang="scss" scoped>
.lobby {
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5% 5%;
    .operate {
      .memoList {
        display: flex;
        margin-bottom: 10%;
        .memo {
          margin-right: 20px;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            width: 48px;
            height: 48px;
          }
          p {
            text-align: center;
            margin-top: 10px;
            font-size: 12px;
          }
        }
        .addMemo {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          width: 48px;
          height: 48px;
        }
      }
      .spendType {
        display: flex;
        justify-content: space-between;
        .type {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 45%;
          height: 60px;
          border-radius: 20px;
          margin-bottom: 30px;
          img {
            position: absolute;
            bottom: 8px;
            left: 10px;
          }
          .text {
            font-size: 14px;
            position: relative;
            left: 30px;
          }
        }
      }
    }
    .spendList {
      flex: 1;
      position: relative;
      h4 {
        margin-bottom: 15px;
        font-size: 12px;
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
          border-radius: 10px;
          height: 55px;
          margin-bottom: 15px;
          padding: 0 20px 0 10px;
          .itemInfo {
            display: flex;
            align-items: center;
            .icon {
              display: flex;
              justify-content: center;
              align-items: center;
              color: #5e94c3;
              width: 36px;
              height: 36px;
              margin-right: 10px;
            }
            h3 {
              font-size: 14px;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>