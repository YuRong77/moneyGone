<template>
  <canvas ref="myChart"></canvas>
</template>
<script>
import Chart from "chart.js/auto";
export default {
  props: ["testList"],
  data() {
    return {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      chart: null,
    };
  },
  watch: {
    testList() {
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
            // {
            //   type: "bar",
            //   backgroundColor: "rgba(255, 99, 132, 0.2)",
            //   // label: "測試1",
            //   data: this.testList,
            //   barPercentage: 0.3,
            // },
            {
              type: "line",
              data: this.testList,
              backgroundColor: (context) => {
                const chart = context.chart;
                const { chartArea } = chart;
                if (!chartArea) {
                  return null;
                }
                var gradientFill = ctx.createLinearGradient(
                  0,
                  chartArea.bottom,
                  0,
                  chartArea.top
                );
                gradientFill.addColorStop(0.8, "#cce4f8");
                gradientFill.addColorStop(0, "#5e94c3");
                return gradientFill;
              },
              borderColor: "#5e94c3",
              // label: "測試2",
              fill: true,
              tension: 0.3,
            },
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
              grid: {
                // borderColor: "red",
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                maxTicksLimit: this.labels.length / 2, //label最多{value}個
              },
            },
            y: {
              grid: {
                // borderColor: "red",
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                stepSize: 1000, //每1000一格
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