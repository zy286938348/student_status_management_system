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
      // 科目id
      courseId:'',
      // 图中数据
      data:[
        { value: 6, name: "不及格率" },
        { value: 3, name: "及格率" }
      ],
      option: {
        backgroundColor: "white",

        title: {
          text: "科目及格率",
          left: "center",
          top: 20,
          textStyle: {
            color: "#000000"
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
            // 字的颜色
            label: {
              color: "rgba(0, 0, 0, 1)"
            },
            // 线的颜色
            labelLine: {
              lineStyle: {
                color: "rgba(0, 0, 0, 1)"
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
    async getData() {

      // const res = await this.$http.get('',{
      //   params:{
      //     courseId:
      //   }
      // })


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
