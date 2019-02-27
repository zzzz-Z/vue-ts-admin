import Layout from '@/components/Layout';
import Video from '@/components/Video/index.vue';
import User from '@/views/system/user';
import Home from '@/views/home';

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
    path: 'video',
    name: 'video',
    component: Video,
    meta: {
      name: 'video',
      path: '/system/video'
    }
  }]
}
]
export default routerMap
