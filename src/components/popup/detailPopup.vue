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
            <div class="type">{{ item.type }}</div>
            <div class="name">{{ item.name }}</div>
            <div class="spend">{{ item.spend }}</div>
          </div>
        </div>
      </div>
      <div class="">
        <button @click="$emit('update:detailPopup', false)">關閉</button>
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
  background: rgba(0, 0, 0, 0.1);
  .detailCard {
    width: 340px;
    height: 630px;
    padding: 20px 20px;
    border-radius: 15px;
    h2 {
      font-size: 16px;
      text-align: center;
    }
    .detailList {
      margin: 20px 0;
      height: 480px;
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
          .type {
            margin-right: 20px;
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
  }
}
</style>