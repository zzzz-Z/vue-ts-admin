import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';
import User from '../views/system/user';
import Login from '@/views/login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Layout,
    meta: {
      name: '主页'
    },
    children: [{
      path: 'login',
      name: 'login',
      component: Login
    }
    ]
  },
  ]
});
