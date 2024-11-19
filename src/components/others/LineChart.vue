<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "@/utils/resize";
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "280px",
    },
    chartData: {
      type: Object,
      required: true,
    },
    echartsName: {
      type: String,
      default: "",
    },
    echartsUnit: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chart: null,
      color: [
        "rgb(62, 255, 194)",
        "rgb(255, 195, 0)",
        "rgb(53, 136, 229)",
        "rgb(13, 235, 251)",
        "rgb(227, 59, 90)",
        "rgb(255, 147, 38)",
        "rgb(176, 210, 231)",
        "rgb(138, 92, 247)",
        "rgb(25, 120, 162)",
        "rgb(67, 207, 124)",
      ],
    };
  },
  watch: {
    // 监听表数据变化，重新初始化图表
    chartData: {
      deep: true,
      handler(val) {
        if (this.chart) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      },
    },
  },
  mounted() {
    // 初始化图表
    this.initChart();
  },
  beforeDestroy() {
    // 页面销毁时 销毁图表
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    // 图表配置项
    setOptions(chartData) {
      let that = this;
      const name = chartData.name;
      const label = chartData.label;
      let series = [];
      let arr = Object.keys(chartData.data);
      arr.forEach((v, index) => {
        series.push({
          smooth: true,
          name: name[index],
          type: "line",
          symbol: "circle",
          symbolSize: 6,
          showSymbol: false,
          // 此处是折线图的颜色
          itemStyle: {
            color: that.color[index],
          },
          lineStyle: {
            color: that.color[index],
          },
          // 折线图内部区域的颜色
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: "rgba(0, 206, 218, 0.08)" },
              { offset: 0, color: that.color[index] },
            ]),
          },
          data: chartData.data[v],
        });
      });
      const options = {
        // 图例位置
        grid: {
          top: 50,
          left: 50,
          right: 60,
          bottom: 20,
          containLabel: false,
        },
        legend: {
          show: false,
          top: 8,
          data: name,
          textStyle: {
            color: "#00000000",
            fontSize: 0,
            lineHeight: 0,
          },
        },
        //  此处判断是否使用自定义 浮框
        tooltip: that.echartsName
          ? {
              trigger: "axis",
              axisPointer: {
                type: "line",
                lineStyle: {
                  color: "rgba(0, 206, 218, 1)",
                },
              },
              borderColor: "transparent",
              backgroundColor: "rgba(6,167,205,.9)",
              padding: 10,
              textStyle: {
                fontSize: 14,
                fontWeight: 400,
                color: "#fffafa",
              },
              // 自定义tip
              formatter: function (params) {
                var htmlStr = "<div>动环信息" + "<br/>";
                htmlStr += "名称：" + that.echartsName + "<br/>";
                htmlStr += "数值：" + params[0].value + "<br/>";
                htmlStr += "时间：" + params[0].name + "<br/>";
                htmlStr += "</div>";
                return htmlStr;
              },
            }
          : {
              // 默认tip
              trigger: "axis",
              axisPointer: {
                type: "line",
                lineStyle: {
                  color: "rgba(0, 206, 218, 1)",
                },
              },
              borderColor: "transparent",
              backgroundColor: "rgba(6,167,205,.9)",
              padding: 10,
              textStyle: {
                fontSize: 14,
                fontWeight: 400,
                color: "#fffafa",
              },
            },
        dataZoom: [
          {
            type: "inside",
            start: 20, //数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            end: 100,
            xAxisIndex: 0, //设置控制xAxis
            // yAxisIndex: 0, //设置控制yAxis
            zoomOnMouseWheel: true, //设置鼠标滚轮不能触发缩放。
          },
        ],
        xAxis: [
          {
            show: false,
            type: "category",
            boundaryGap: false,
            showMinLabel: true,
            showMaxLabel: true,
            data: label,
            axisLabel: {
              // X 轴刻度样式
              textStyle: {
                color: "#333",
                fontSize: 12,
                fontWeight: 500,
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            show: false,
            type: "value",
            minInterval: 1,
            //  Y轴刻度颜色
            axisLabel: {
              textStyle: {
                color: "#333",
                fontSize: 12,
                fontWeight: 400,
              },
            },
            // Y 轴刻度线
            splitLine: {
              lineStyle: {
                color: "#dddddd",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            name: this.echartsUnit, // Y轴显示 单位
            nameTextStyle: {
              color: "#dddddd",
              padding: [0, 0, 12, 0],
            },
          },
        ],
        series: series,
      };
      this.chart.setOption(options);
    },
  },
};
</script>
