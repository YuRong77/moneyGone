<template>
  <div class="record">
    <div class="header">
      <div class="changeMonthBtn" @click="changeMonth(-1)">
        <i class="fas fa-angle-left"></i>
      </div>
      <div class="recordMonth">
        <h3>花費紀錄</h3>
        <div class="currentMonth">{{ currentMonth }}</div>
      </div>
      <div class="changeMonthBtn" @click="changeMonth(1)">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="recordList">
      <div class="list">
        <div class="recordItem" v-for="(item, index) in spendList" :key="index">
          <div class="date">{{ item.date }}</div>
          <div class="total">總計: {{ item.total }}</div>
          <div class="detail" @click="openDetail(item.details)">明細</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentMonth: moment().format("YYYY-MM"),
    };
  },
  watch: {
    currentMonth() {
      this.getSpendRecord();
    },
  },
  computed: {
    ...mapState("spend", ["spendList"]),
  },
  methods: {
    getSpendRecord() {
      const data = {
        startDate: moment(this.currentMonth)
          .startOf("month")
          .format("YYYY-MM-DD"),
        endDate: moment(this.currentMonth).endOf("month").format("YYYY-MM-DD"),
      };
      this.$store.dispatch("spend/getSpendRecord", data);
    },
    changeMonth(val) {
      this.currentMonth = moment(this.currentMonth)
        .add(val, "M")
        .format("YYYY-MM");
    },
    openDetail(items) {
      console.log(items);
    },
  },
  created() {
    this.getSpendRecord();
  },
};
</script>

<style lang="scss" scoped>
.record {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    height: 85px;
    .changeMonthBtn {
      width: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .recordMonth {
      flex: 1;
      text-align: center;
      h3 {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
  .recordList {
    flex: 1;
    position: relative;
    .list {
      padding: 5% 5%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      .recordItem {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 55px;
        border-radius: 10px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>