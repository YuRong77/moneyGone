<template>
  <div class="chart">
    <div class="header">
      <div class="changeMonthBtn" @click="changeMonth(-1)">
        <i class="fas fa-angle-left"></i>
      </div>
      <div class="spendStatistics">
        <h3 class="font-14">{{ $t("LC_CHART") }}</h3>
        <div class="currentMonth font-18">{{ currentMonth }}</div>
      </div>
      <div class="changeMonthBtn" @click="changeMonth(1)">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
    <div class="content">
      <div class="monthChart" style="margin-bottom: 20px">
        <h5 class="font-14">{{ $t("LC_CHART_MONTH") }}</h5>
        <div class="spendTypeList">
          <div
            class="spendTypeItem"
            v-for="item in getTypeMonth"
            :key="item.type"
          >
            <div class="icon font-14"><i :class="getIcon(item.type)"></i></div>
            <div class="spend">{{ item.total }}</div>
          </div>
        </div>
        <div class="chartArea" style="padding-bottom: 20px">
          <ComboChart :spendList="getSpendMonth" :labels="getMonthLabel" />
          <div class="chartBtn font-14" v-show="!isLoading">
            <div
              class="left"
              :class="{ active: isFirstHalf }"
              @click="isFirstHalf = true"
            >
              {{ $t("LC_FIRST_HALF") }}
            </div>
            <div
              class="right"
              :class="{ active: !isFirstHalf }"
              @click="isFirstHalf = false"
            >
              {{ $t("LC_LAST_HALF") }}
            </div>
          </div>
        </div>
      </div>
      <div class="yearChart">
        <h5 class="font-14">{{ $t("LC_CHART_YEAR") }}</h5>
        <div class="spendTypeList">
          <div
            class="spendTypeItem"
            v-for="item in getTypeYear"
            :key="item.type"
          >
            <div class="icon font-14"><i :class="getIcon(item.type)"></i></div>
            <div class="spend">{{ item.total }}</div>
          </div>
        </div>
        <div class="chartArea">
          <ComboChart
            :spendList="getSpendYear"
            :labels="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
            :isYearChart="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComboChart from "@/components/chart/comboChart.vue";
import { mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    ComboChart,
  },
  data() {
    return {
      currentMonth: moment().format("YYYY-MM"),
      isFirstHalf: true,
      spendMonth: {},
      spendYear: {},
      test: [
        { type: 1, total: 2000 },
        { type: 2, total: 2200 },
        { type: 3, total: 2100 },
        { type: 4, total: 2300 },
      ],
    };
  },
  computed: {
    ...mapState("statistics", ["spendStatistics"]),
    ...mapState("memberInfo", ["isLoading"]),
    getTypeMonth() {
      return this.spendMonth.spendType;
    },
    getSpendMonth() {
      const { spendList } = this.spendMonth;
      if (!spendList) return;
      return this.isFirstHalf ? spendList.slice(0, 15) : spendList.slice(15);
    },
    getMonthLabel() {
      const { spendList } = this.spendMonth;
      if (!spendList) return;
      const labels = [];
      spendList.forEach((item, index) => labels.push(index + 1));
      return this.isFirstHalf ? labels.slice(0, 15) : labels.slice(15);
    },
    getTypeYear() {
      return this.spendYear.spendType;
    },
    getSpendYear() {
      const { spendList } = this.spendYear;
      return spendList ? spendList : [];
    },
  },
  watch: {
    currentMonth() {
      this.getChartData();
    },
    spendStatistics(val) {
      const { spendMonth, spendYear } = val;
      this.spendMonth = spendMonth;
      this.spendYear = spendYear;
    },
  },
  methods: {
    setTest() {
      this.testList = [
        7000, 7200, 7150, 7755, 7767, 7144, 7032, 7987, 7467, 6947, 6986, 7698,
        7367, 7174, 7956,
      ];
    },
    setTest2() {
      this.testList = [
        7100, 7240, 7650, 7155, 7467, 7344, 7352, 7287, 7867, 6947, 6186, 7698,
        7867, 7174, 7456,
      ];
    },
    getChartData() {
      const data = {
        year: moment(this.currentMonth).year(),
        month: moment(this.currentMonth).format("MM"),
      };
      this.$store.dispatch("statistics/getSpendStatistics", data);
    },
    changeMonth(val) {
      this.currentMonth = moment(this.currentMonth)
        .add(val, "M")
        .format("YYYY-MM");
    },
    getIcon(type) {
      if (type === 1) return "fas fa-utensils";
      if (type === 2) return "fas fa-gamepad";
      if (type === 3) return "fas fa-graduation-cap";
      if (type === 4) return "fas fa-comment-dots";
    },
  },
  created() {
    const firstHalf = moment().date() < 15;
    this.isFirstHalf = firstHalf;
    this.getChartData();
  },
};
</script>

<style lang="scss" scoped>
.chart {
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
    .spendStatistics {
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
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5% 5%;
    .monthChart,
    .yearChart {
      flex: 1;
      position: relative;
      // margin-bottom: 10px;
      h5 {
        margin-bottom: 5px;
      }
      .spendTypeList {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .spendTypeItem {
          width: 22%;
          border-radius: 5px;
          text-align: center;
          padding: 8px 0;
          .icon {
            color: #5e94c3;
          }
        }
      }
      .chartArea {
        position: absolute;
        right: 0;
        left: 0;
        top: 92px;
        bottom: 0;
        // padding: 10px 5px 20px 5px;
        padding: 10px;
        border-radius: 10px;
        .chartBtn {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -18px;
          display: flex;
          z-index: 10;
          div {
            padding: 8px;
            margin: 0 -1px;
            border: 1px solid #ffcd3f;
            &.active {
              background: #ffcd3f;
              color: white;
            }
          }
          .left {
            border-radius: 10px 0 0 10px;
          }
          .right {
            border-radius: 0 10px 10px 0;
          }
        }
      }
    }
  }
}
</style>