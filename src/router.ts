import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';
import home from './views/home';
import User from './views/system/user';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: '主页',
      component: Layout,
      meta: {
        name: '主页'
      },
      children: [{
        path: '',
        name: '11',
        component: User
      }
      ]
    }
  ],
});
