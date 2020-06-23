import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/vue-echarts.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体样式
import './assets/fonts/iconfont.css'

// 配置axios
import axios from 'axios'

import XLSX from 'xlsx'

Vue.prototype.XLSX = XLSX

// 设置请求根路径
// axios.defaults.baseURL = 'http://10.139.46.13:8080/sms/'
// axios.defaults.baseURL = 'http://127.0.1:8080/sms/'
// axios.defaults.baseURL = 'http://localhost:8080/sms/'
axios.defaults.baseURL = 'http://39.97.114.115:8080/studentManageSystem/'

// 导入项目中
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
