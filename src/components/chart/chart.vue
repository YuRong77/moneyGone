<template>
  <div class="chart">
    <div class="header">
      <div class="changeMonthBtn" @click="changeMonth(-1)">
        <i class="fas fa-angle-left"></i>
      </div>
      <div class="spendStatistics">
        <h3 class="font-14">{{ $t("LC_STATISTICS") }}</h3>
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
            class="spendTypeItem boxShadow"
            v-for="(item, index) in getTypeMonth"
            :key="item.type"
          >
            <div class="icon font-14">
              <i :class="getIcon(index + 1)"></i>
            </div>
            <div class="spend">{{ item.total || 0 }}</div>
          </div>
        </div>
        <div class="chartArea boxShadow" style="padding-bottom: 20px">
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
            class="spendTypeItem boxShadow"
            v-for="(item, index) in getTypeYear"
            :key="item.type"
          >
            <div class="icon font-14"><i :class="getIcon(index + 1)"></i></div>
            <div class="spend">{{ item.total || 0 }}</div>
          </div>
        </div>
        <div class="chartArea boxShadow">
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
    };
  },
  computed: {
    ...mapState("statistics", ["spendStatistics"]),
    ...mapState("memberInfo", ["isLoading"]),
    getTypeMonth() {
      if (this.spendMonth.type) {
        const spendTypeList = Object.keys(this.spendMonth.type).map((key) => {
          return { type: key, total: this.spendMonth.type[key] };
        });
        return spendTypeList;
      }
    },
    getSpendMonth() {
      const { list } = this.spendMonth;
      if (!list) return;
      return this.isFirstHalf ? list.slice(0, 15) : list.slice(15);
    },
    getMonthLabel() {
      const { list } = this.spendMonth;
      if (!list) return;
      const labels = [];
      list.forEach((item, index) => labels.push(index + 1));
      return this.isFirstHalf ? labels.slice(0, 15) : labels.slice(15);
    },
    getTypeYear() {
      if (this.spendYear.type) {
        const spendTypeList = Object.keys(this.spendYear.type).map((key) => {
          return { type: key, total: this.spendYear.type[key] };
        });
        return spendTypeList;
      }
    },
    getSpendYear() {
      const { list } = this.spendYear;
      return list ? list : [];
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
    getChartData() {
      const data = {
        year: moment(this.currentMonth).year().toString(),
        month: moment(this.currentMonth).format("MM"),
      };
      this.$store
        .dispatch("statistics/getSpendStatistics", data)
        .catch((err) => this.$bus.$emit("sendMessage", err.message, err.state));
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
          backdrop-filter: blur(5px);
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