import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Login,
    meta: {
      name: '主页'
    }
  }]
});
