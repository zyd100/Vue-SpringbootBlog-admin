import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router.js'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(axios)
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
