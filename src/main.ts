import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ViserVue from 'viser-vue'


import 'ant-design-vue/dist/antd.css'

import components from './components';
import { request } from '@/utils/request'
import { getStorage } from './utils/storage';
import { GlobalStore } from './store/global';
import { createFormModal } from '@/components/Modal/createModal';
import '@/directive'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import antd from 'ant-design-vue';
Vue.use(antd)



Vue.use(ViserVue)
Vue.use(components)

Vue.prototype.Axios = request // 全局请求函数
// Vue.prototype.validator = validator // 全局表单验证
Vue.prototype.moment = moment
Vue.prototype.$createFormModal = createFormModal

Vue.config.productionTip = false
GlobalStore.saveAsyncRoutes(getStorage('asyncRoutes'))

new Vue({
  el: '#App',
  router,
  store,
  mounted() {
    const loading = document.getElementById('loading-init') as Element
    document.body.removeChild(loading)
  },
  render: (h) => h(App),
})

