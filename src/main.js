import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import $ from 'jquery'

Vue.config.productionTip = false

// 安装路由
Vue.use(VueRouter);

// 安装 ElementUI
Vue.use(ElementUI);

Vue.prototype.$http = axios
// axios.
axios.defaults.baseURI = '/api'
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.prototype.$ = $

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
