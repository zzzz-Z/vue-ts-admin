import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: (...arg) => (arg[2] || { x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Login,
    meta: {
      name: '主页'
    }
  }]
});

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => NProgress.done())

export default router
