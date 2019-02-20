import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [],
      meta: {
        name: 'home'
      }
    }, {
      path: '/logmanage/operate',
      name: 'Layout',
      component: Layout,
      children: [],
      meta: {
        name: 'home'
      }
    }
  ],
});
