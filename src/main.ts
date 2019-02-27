import 'ant-design-vue/dist/antd.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd, { Form } from 'ant-design-vue'
import moment from 'moment'
import ViserVue from 'viser-vue'
import request from '@/utils/request'
import 'moment/locale/zh-cn'
import routerMap from './router/router.map';

moment.locale('zh-cn')

router.addRoutes(routerMap)

Vue.use(antd)
Vue.use(ViserVue)
Vue.prototype.$form = Form

Vue.prototype.Axios = request // 全局请求函数
// Vue.prototype.validator = validator // 全局表单验证
Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
