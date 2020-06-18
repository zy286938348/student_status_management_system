<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <v-chart :options="option" />
    </el-card>
  </div>
</template>

<script>
import ECharts from "vue-echarts";

import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";

import "echarts/lib/component/polar";

import "echarts/lib/component/tooltip";
// 图例
import "echarts/lib/component/legend";
// 标题
import "echarts/lib/component/title";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    let data = [];
    
    return {
      // 图中数据
      data:[
        { value: 6, name: "不及格率" },
        { value: 4, name: "及格率" }
      ],
      option: {
        backgroundColor: "#000000",

        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [],
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      }
    };
  },
  methods: {
    // 获取图中数据
    getData() {
      this.option.series[0].data = this.data.sort(function(a, b) {
        return a.value - b.value;
      });
    }
  },
  created(){
    this.getData()
  }
};
</script>
</script>

<style lang="less" scoped>
</style>
