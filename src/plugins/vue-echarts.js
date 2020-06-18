import Vue from 'vue'
import ECharts from 'vue-echarts'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'


// register component to use
Vue.component('v-chart', ECharts)