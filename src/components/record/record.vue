<template>
  <div class="record">
    <div class="header">
      <div class="changeMonthBtn" @click="changeMonth(-1)">
        <i class="fas fa-angle-left"></i>
      </div>
      <div class="recordMonth">
        <h3 class="font-14">{{ $t("LC_SPEND_RECORD") }}</h3>
        <div class="currentMonth font-18">{{ currentMonth }}</div>
      </div>
      <div class="changeMonthBtn" @click="changeMonth(1)">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="recordList">
      <div class="list">
        <div class="recordItem" v-for="(item, index) in spendList" :key="index">
          <div class="date font-16">{{ item.date }}</div>
          <div class="total font-16">{{ $t("LC_TOTAL") }}: {{ item.total }}</div>
          <div
            class="detail confirmBtn font-16"
            @click="openDetail(item.date, item.details)"
          >
            {{ $t("LC_DETAIL") }}
          </div>
        </div>
      </div>
    </div>
    <DetailPopup
      v-if="detailPopup"
      :detailPopup.sync="detailPopup"
      :currentDetail="currentDetail"
    />
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import DetailPopup from "@/components/popup/detailPopup";
export default {
  components: {
    DetailPopup,
  },
  data() {
    return {
      currentMonth: moment().format("YYYY-MM"),
      currentDetail: null,
      detailPopup: false,
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
    openDetail(_date, _list) {
      this.currentDetail = {
        date: _date,
        list: _list,
      };
      this.detailPopup = true;
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
        margin-bottom: 5px;
      }
      .currentMonth {
        margin-bottom: 5px;
        font-weight: bold;
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
      -webkit-overflow-scrolling: touch;
      .recordItem {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 55px;
        border-radius: 10px;
        margin-bottom: 15px;
        .date {
          font-weight: bold;
        }
        .detail {
          padding: 5px 10px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>