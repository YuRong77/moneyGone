<template>
  <div class="lobby">
    <Header />
    <div class="main">
      <div class="operate">
        <div class="memoList">
          <div class="addMemo memo" @click="openMemo(null)">
            <div class="boxShadow confirmBtn btn">+</div>
          </div>
          <div
            class="memo"
            v-for="item in memoList"
            :key="item.id"
            @click="openMemo(item)"
          >
            <div class="boxShadow btn"><i class="far fa-sticky-note"></i></div>
            <p class="font-12">{{ memoTitleFilter(item.title) }}</p>
          </div>
        </div>
        <div class="spendType">
          <div class="type boxShadow btn" @click="addSpend(1)">
            <img src="@/assets/img/life.svg" alt="" />
            <div class="text font-16">{{ $t("LC_LIFE") }}</div>
          </div>
          <div class="type boxShadow btn" @click="addSpend(2)">
            <img src="@/assets/img/fun.svg" alt="" />
            <div class="text font-16">{{ $t("LC_FUN") }}</div>
          </div>
        </div>
        <div class="spendType">
          <div class="type boxShadow btn" @click="addSpend(3)">
            <img src="@/assets/img/study.svg" alt="" />
            <div class="text font-16">{{ $t("LC_STUDY") }}</div>
          </div>
          <div class="type boxShadow btn" @click="addSpend(4)">
            <img src="@/assets/img/other.svg" alt="" />
            <div class="text font-16">{{ $t("LC_OTHER") }}</div>
          </div>
        </div>
      </div>
      <div class="spendList">
        <h4 class="font-14">{{ $t("LC_SPEND_TODAY") }}</h4>
        <div class="list">
          <div
            class="listItem boxShadow"
            v-for="(item, index) in memberInfo.spendList"
            :key="index"
          >
            <div class="itemInfo">
              <div class="icon font-18">
                <i :class="getSpendIcon(item.type)"></i>
              </div>
              <div>
                <h3 class="font-16">{{ item.name }}</h3>
                <span class="font-14">{{ getType(item.type) }}</span>
              </div>
            </div>
            <div class="itemSpend">NT$ {{ item.spend }}</div>
          </div>
          <div class="empty" v-if="memberInfo.spendList.length === 0">
            <div>
              <img src="@/assets/img/rain.svg" alt="" />
              <h3 class="font-18">{{ $t("LC_EMPTY_SPEND") }}</h3>
            </div>
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
export default {
  components: {
    Header,
    MemoPopup: () =>
      import(
        /* webpackChunkName: "memoPopup" */ "@/components/popup/memoPopup.vue"
      ),
    SpendPopup: () =>
      import(
        /* webpackChunkName: "spendPopup" */ "@/components/popup/spendPopup.vue"
      ),
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
    memoTitleFilter(title) {
      if (title.length > 5) return title.split("").slice(0, 4).join("") + "...";
      return title;
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
    padding: 5%;
    @media (max-height: 800px) and (min-width: 900px) {
      padding: 2%;
    }
    .operate {
      .memoList {
        display: flex;
        margin-bottom: 8%;
        @media (max-height: 800px) {
          margin-bottom: 2%;
        }
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        //隱藏scrollbar
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        scrollbar-width: none; /* for Firefox */
        &::-webkit-scrollbar {
          display: none; /* for Chrome, Safari, and Opera */
        }
        .memo {
          margin-right: 25px;
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
            white-space: nowrap;
            margin-top: 10px;
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
          @media (max-height: 800px) and (min-width: 900px) {
            margin-bottom: 20px;
          }
          img {
            position: absolute;
            bottom: 8px;
            left: 10px;
          }
          .text {
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
      }
      .list {
        position: absolute;
        left: 0;
        top: 30px;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .listItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 10px;
          height: 60px;
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
          }
        }
      }
      .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 20px;
        img {
          margin-bottom: 20px;
        }
      }
      @media (max-height: 800px) {
        .empty div {
          height: 100%;
          display: flex;
          align-items: center;
          padding: 15px;
          img {
            max-height: 100%;
            margin: 0 20px 0 0;
          }
        }
      }
    }
  }
}
</style>