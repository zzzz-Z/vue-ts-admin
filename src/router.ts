import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/components/Layout';
import home from './views/home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/logmanage',
      name: 'logmanage',
      component: Layout,
      meta: {
        name: 'logmanage'
      },
      children: [{
        path: 'operate',
        name: 'operate',
        component: home,
        meta: {
          name: 'operate'
        }
      }]
    }
    ,
    {
      path: '/monitor',
      name: 'monitor',
      component: Layout,
      meta: {
        name: 'logmanage'
      }
    }
  ],
});
