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
            <div class="date">建立時間: {{ getDate(item.date) }}</div>
            <div class="remark">備註: {{ item.remark }}</div>
          </div>
          <div class="info">
            <div>
              <div>{{ item.type }}</div>
              <div>{{ item.name }}</div>
            </div>
            <div>{{ item.spend }}</div>
          </div>
        </div>
      </div>
      <button @click="$emit('update:detailPopup', false)">關閉</button>
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
    height: 600px;
    padding: 30px 20px;
    border-radius: 15px;
    background: white;
    h2 {
      font-size: 16px;
      text-align: center;
    }
    .detailList {
      margin: 20px 0;
      .detailItem {
        .directions {
          display: flex;
        }
        .info {
          display: flex;
        }
      }
    }
  }
}
</style>