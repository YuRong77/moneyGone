<template>
  <div class="chart">
    <div class="header">
      <h3>統計圖表</h3>
    </div>
    <div class="content">
      <div class="monthChart">
        <h5>本月統計</h5>
        <div class="spendTypeList">
          <div class="spendTypeItem" v-for="item in test" :key="item.type">
            <div class="icon"><i :class="getIcon(item.type)"></i></div>
            <div class="spend">{{ item.total }}</div>
          </div>
        </div>
        <div class="chartArea">
          <ComboChart :testList="testList" />
          <div class="chartBtn">
            <div @click="setTest()">上半月</div>
            <div @click="setTest2()">下半月</div>
          </div>
        </div>
      </div>
      <div class="yearChart">
        <h5>年度統計</h5>
        <div class="spendTypeList">
          <div class="spendTypeItem" v-for="item in test" :key="item.type">
            <div class="icon"><i :class="getIcon(item.type)"></i></div>
            <div class="spend">{{ item.total }}</div>
          </div>
        </div>
        <div class="chartArea">
          <ComboChart :testList="testList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComboChart from "@/components/chart/comboChart.vue";
export default {
  components: {
    ComboChart,
  },
  data() {
    return {
      test: [
        { type: 1, total: 2000 },
        { type: 2, total: 2200 },
        { type: 3, total: 2100 },
        { type: 4, total: 2300 },
      ],
      testList: [
        7000, 7200, 7150, 7755, 7767, 7144, 7032, 7987, 7467, 6947, 6986, 7698,
        7367, 7174, 7956,
      ],
    };
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
    getIcon(type) {
      if (type === 1) return "fas fa-utensils";
      if (type === 2) return "fas fa-gamepad";
      if (type === 3) return "fas fa-graduation-cap";
      if (type === 4) return "fas fa-comment-dots";
    },
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
    justify-content: center;
    height: 64px;
    h3 {
      font-size: 18px;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 3% 5%;
    .monthChart,
    .yearChart {
      flex: 1;
      position: relative;
      margin-bottom: 10px;
      h5 {
        margin-bottom: 5px;
      }
      .spendTypeList {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .spendTypeItem {
          background: white;
          width: 22%;
          border-radius: 5px;
          text-align: center;
          padding: 8px 0;
          .icon {
            color: #5e94c3;
            font-size: 14px;
          }
        }
      }
      .chartArea {
        background: white;
        position: absolute;
        right: 0;
        left: 0;
        top: 92px;
        bottom: 0;
        padding: 10px 5px 20px 5px;
        border-radius: 10px;
        .chartBtn {
          background: rgb(250, 250, 250);
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -20px;
          padding: 10px;
          border-radius: 10px;
          display: flex;
        }
      }
    }
  }
}
</style>