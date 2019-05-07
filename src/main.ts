import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ViserVue from 'viser-vue';
import components from './components';
import { getStorage } from './utils/storage';
import { GlobalStore } from './store/global';
import { createFormModal } from '@/components/Modal/createModal';
import { Api } from './services';
import moment from 'moment';
import antd from 'ant-design-vue';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// openlayers
import ol from 'ol';


Vue.use(antd);
Vue.use(ViserVue);
Vue.use(components);
import '@/directive';

Vue.prototype.Api = Api;
Vue.prototype.moment = moment;
Vue.prototype.$createFormModal = createFormModal;

Vue.config.productionTip = false;
GlobalStore.saveAsyncRoutes(
  getStorage('asyncRoutes')
);

new Vue({
  el: '#App',
  router,
  store,
  render: (h) => h(App)
});


