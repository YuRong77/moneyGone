<template>
  <div class="detailPopup popupMask">
    <div class="detailCard animate__animated animate__fadeInUp animate__faster">
      <h2 class="font-16">{{ currentDetail.date }} {{ $t("LC_DETAIL") }}</h2>
      <div class="detailList">
        <div
          class="detailItem"
          v-for="(item, index) in currentDetail.list"
          :key="index"
        >
          <div class="directions">
            <span class="font-14"
              >{{ $t("LC_BUILD_TIME") }}: {{ getDate(item.date) }}</span
            >
            <span class="font-14"
              >{{ $t("LC_REMARK") }}: {{ item.remark }}</span
            >
          </div>
          <div class="info">
            <div class="type"><i :class="getSpendIcon(item.type)"></i></div>
            <div class="name font-16">{{ item.name }}</div>
            <div class="spend font-16">NT$ {{ item.spend }}</div>
          </div>
        </div>
      </div>
      <div class="detailBtn">
        <div @click="$emit('update:detailPopup', false)">
          {{ $t("LC_CLOSE") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["detailPopup", "currentDetail"],
  data() {
    return {};
  },
  methods: {
    getDate(date) {
      return moment(date).format("HH:mm:ss");
    },
    getSpendIcon(type) {
      if (type === 1) return "fas fa-utensils";
      if (type === 2) return "fas fa-gamepad";
      if (type === 3) return "fas fa-graduation-cap";
      if (type === 4) return "fas fa-comment-dots";
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.detailPopup {
  .detailCard {
    width: 95%;
    max-width: 400px;
    height: 630px;
    padding: 20px 20px;
    border-radius: 15px;
    h2 {
      text-align: center;
    }
    .detailList {
      margin: 20px 0;
      height: 500px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .detailItem {
        border-radius: 5px;
        margin-bottom: 20px;
        padding: 10px 15px;
        .directions {
          margin-bottom: 10px;
          padding-bottom: 5px;
          span {
            margin-right: 30px;
          }
        }
        .info {
          display: flex;
          align-items: center;
          padding: 5px 0;
          .type {
            color: #5e94c3;
            margin-right: 15px;
            width: 20px;
          }
          .name {
            margin-right: auto;
          }
        }
      }
    }
    .detailBtn {
      display: flex;
      justify-content: center;
      div {
        padding: 5px 15px;
        border-radius: 5px;
      }
    }
  }
}
</style>