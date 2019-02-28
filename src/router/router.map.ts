import Video from '@/components/Video/index.vue';
import User from '@/views/system/user';
import Home from '@/views/home';
import Permission from '@/views/system/permission';
import Layout from '@/components/Layout';

const routerMap = [{
  path: '/system',
  component: Layout,
  meta: {
    icon: 'user',
    name: '系统管理',
    path: '/system'
  },
  children: [{
    path: 'user',
    name: 'user',
    component: User,
    meta: {
      name: '用户',
      path: '/system/user'
    }
  }, {
    path: 'home',
    name: 'home',
    component: Home,
    meta: {
      name: 'home',
      path: '/system/home'
    }
  }, {
    path: 'permission',
    name: 'permission',
    component: Permission,
    meta: {
      name: 'permission',
      path: '/system/permission'
    }
  }]
}
]
export default routerMap
