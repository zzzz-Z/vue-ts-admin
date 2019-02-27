import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import './lib/antd.use';
import router from './router'
import store from './store/index'
import moment from 'moment'
import ViserVue from 'viser-vue'
import request from '@/utils/request'
import 'moment/locale/zh-cn'
import { getStorage } from './utils/storage';
import GlobalStore from './store/global';

moment.locale('zh-cn')

const asyncRoutes = getStorage('asyncRoutes')
if (asyncRoutes) {
  GlobalStore.saveAsyncRoutes(asyncRoutes)
}

Vue.use(ViserVue)

Vue.prototype.Axios = request // 全局请求函数
// Vue.prototype.validator = validator // 全局表单验证
Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
