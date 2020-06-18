module.exports = {
  // 关闭selint的代码报错
  lintOnSave: false,
  devServer: {
    port: 8081,
    open: true
  },
  // 配置echarts
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
