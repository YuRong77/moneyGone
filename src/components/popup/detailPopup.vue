<template>
  <div class="detailPopup">
    <div class="detailCard">
      <h2>{{ currentDetail.date }} 明細</h2>
      <div class="detailList">
        <div
          class="detailItem"
          v-for="(item, index) in currentDetail.list"
          :key="index"
        >
          <div class="directions">
            <span>建立時間: {{ getDate(item.date) }}</span>
            <span>備註: {{ item.remark }}</span>
          </div>
          <div class="info">
            <div class="type"><i :class="getSpendIcon(item.type)"></i></div>
            <div class="name">{{ item.name }}</div>
            <div class="spend">NT$ {{ item.spend }}</div>
          </div>
        </div>
      </div>
      <div class="detailBtn">
        <div @click="$emit('update:detailPopup', false)">關閉</div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .detailCard {
    width: 95%;
    height: 630px;
    padding: 20px 20px;
    border-radius: 15px;
    h2 {
      font-size: 16px;
      text-align: center;
    }
    .detailList {
      margin: 20px 0;
      height: 500px;
      overflow-y: auto;
      .detailItem {
        border-radius: 5px;
        margin-bottom: 20px;
        padding: 10px 15px;
        .directions {
          margin-bottom: 10px;
          padding-bottom: 5px;
          span {
            font-size: 12px;
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
            font-size: 14px;
            margin-right: auto;
          }
          .spend {
            font-size: 14px;
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