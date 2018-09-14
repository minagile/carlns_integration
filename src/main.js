// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
import VueResource from 'vue-resource'
import { post, fetch } from './assets/js/http'

import './assets/css/style.css'
import vueEventCalendar from 'vue-event-calendar'

Vue.use(vueEventCalendar, {
  locale: 'en',
  color: 'rgb(158, 123, 255)'
})

// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch

Vue.use(VueResource)

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
