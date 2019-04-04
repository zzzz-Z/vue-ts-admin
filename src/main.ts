import { createFormModal } from '@/components/Modal/createModal';
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ViserVue from 'viser-vue'
import {request} from '@/utils/request'
import { getStorage } from './utils/storage';
import {GlobalStore} from './store/global';
import '@/directive'
import './antd/antd.use';
import 'highlight.js/styles/github.css';

import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')


GlobalStore.saveAsyncRoutes(getStorage('asyncRoutes'))

Vue.use(ViserVue)


Vue.prototype.Axios = request // 全局请求函数
// Vue.prototype.validator = validator // 全局表单验证
Vue.prototype.moment = moment
Vue.prototype.$createFormModal = createFormModal

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
