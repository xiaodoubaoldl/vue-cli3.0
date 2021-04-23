// console.log(process.env.NAME)
// console.log(process.env)
const utils = require('./build/utils')
console.log(utils.setPages())
const configs = require('./config')
const merge = require('webpack-merge')
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env
// const baseUrl = process.env.BASE_URL
module.exports = {
  // publicPath: "/vue",
  // assetsDir: "static",
  // outputDir: 'dist',
  // productionSourceMap: true,
  pages: utils.setPages(),
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        const name = 'process.env'
        args[0][name] = merge(args[0][name], cfg)
        return args
      })
  },
  devServer: {
    // historyApiFallback: {
    //   rewrites: [
    //     { from: new RegExp(baseUrl + 'page1'), to: baseUrl + 'page1.html' }
    //   ]
    // },
    open: true, // 配置自动启动浏览器
    // 配置跨域处理
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
