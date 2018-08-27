// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../mock/index'
import '../static/reset.css'
import {
  store
} from './store/store'
import '../static/bootstrap-3.3.7-dist/css/bootstrap.min.css'
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store: store
})
