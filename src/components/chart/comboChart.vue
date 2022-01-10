<template>
  <canvas ref="myChart"></canvas>
</template>
<script>
import Chart from "chart.js/auto";
import { mapState } from "vuex";
export default {
  props: {
    spendList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    labels: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isYearChart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    ...mapState("setting", ["theme"]),
  },
  watch: {
    spendList() {
      this.chart.destroy();
      this.getChart();
    },
  },
  methods: {
    getChart() {
      const ctx = this.$refs.myChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              type: "bar",
              backgroundColor: "#5e94c3",
              // label: "測試1",
              data: this.spendList,
              barPercentage: 0.3,
            },
            // {
            //   type: "line",
            //   data: this.spendList,
            //   backgroundColor: (context) => {
            //     const chart = context.chart;
            //     const { chartArea } = chart;
            //     if (!chartArea) {
            //       return null;
            //     }
            //     var gradientFill = ctx.createLinearGradient(
            //       0,
            //       chartArea.bottom,
            //       0,
            //       chartArea.top
            //     );
            //     gradientFill.addColorStop(0.8, "#cce4f8");
            //     gradientFill.addColorStop(0, "#5e94c3");
            //     return gradientFill;
            //   },
            //   borderColor: "#5e94c3",
            //   // label: "測試2",
            //   fill: true,
            //   tension: 0.3,
            // },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              // title: {
              //   color: "red",
              //   display: true,
              //   text: "Month",
              // },
              // weight: 100,
              grid: {
                borderColor:
                  this.theme === "lightMode"
                    ? "rgba(0, 0, 0, 0.1)"
                    : "rgba(255, 255, 255, 0.3)",
                drawOnChartArea: false,
                drawTicks: false,
                color: "rgba(0, 0, 0, 0.3)",
              },
              ticks: {
                maxTicksLimit: this.labels.length / 2, //label最多{value}個
                color:
                  this.theme === "lightMode"
                    ? "rgba(0, 0, 0, 0.6)"
                    : "rgba(255, 255, 255, 0.6)",
              },
            },
            y: {
              // display: false ,
              grid: {
                borderColor:
                  this.theme === "lightMode"
                    ? "rgba(0, 0, 0, 0.1)"
                    : "rgba(255, 255, 255, 0.3)",
                borderWidth: 2,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                stepSize: this.isYearChart ? 500 : 50, //每XXX一格
                color:
                  this.theme === "lightMode"
                    ? "rgba(0, 0, 0, 0.6)"
                    : "rgba(255, 255, 255, 0.6)",
                // padding: 20,
                // textStrokeWidth: 100,
                // display: false,
              },
            },
          },
          plugins: {
            // title: {
            //   //最上方標題
            //   display: true,
            //   text: "我是標題",
            //   font: {
            //     size: 16,
            //   },
            // },
            legend: {
              //上方顏色標示
              labels: {
                font: {
                  size: 8,
                },
                // boxWidth: 10, //色塊寬度
                // boxHeight: 10 //色塊高度
                // padding: 5
                // usePointStyle: true //使用圓點
              },
              display: false, //是否顯示
              // position: 'bottom' //顯示位置 預設top
              // align: 'end' //預設center
            },
          },
        },
      });
    },
  },
  mounted() {
    this.getChart();
  },
};
</script>