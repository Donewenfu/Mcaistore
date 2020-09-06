import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入fastclick
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}



//引入vanUI 插件
import '@/plugs/vantui.js'

import 'amfe-flexible'

//引入全局样式
import '@/style/common.css'

//swiper css
import "swiper/dist/css/swiper.css";

//定义全局过滤器
import '@/config/filter.js'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
