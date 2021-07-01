import 'whatwg-fetch'
import 'custom-event-polyfill'
import 'core-js/stable/promise'
import 'core-js/stable/symbol'
import 'core-js/stable/string/starts-with'
import 'core-js/web/url'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Http from '@/services/http.js'
import utils from '@/utils'
// 如果是非正式环境，加载 VConsole
// if (process.env.NODE_ENV !== 'production') {
//   var VConsole = require('vconsole/dist/vconsole.min.js')
//   var vConsole = new VConsole()
//   console.log(vConsole)
// }
Vue.prototype.$http = Http
Vue.prototype.$utils = utils
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
