import Layout from '@/components/Layout';
import User from '@/views/system/user';

export default [{
  path: '/oneItem',
  component: Layout,
  meta: {
    icon: 'user',
    name: 'home',
    path: '/home'
  },
  children: [{
    path: '',
    component: () => import('@/views/home'),
    meta: {
      icon: 'user',
      name: 'home',
      path: '/oneItem'
    }
  }]
}, {
  path: '/user',
  component: Layout,
  meta: {
    icon: 'user',
    name: 'user',
    path: '/user'
  },
  children: [{
    path: '',
    component: User,
    meta: {
      icon: 'user',
      name: 'i11111111111',
      path: '/user'
    }
  }]
}, {
  path: '/system',
  component: Layout,
  meta: {
    icon: 'user',
    name: 'system',
    path: '/system'
  },
  children: [{
    path: 'user',
    name: 'user',
    component: User,
    meta: {
      icon: 'user',
      name: 'user',
      path: '/system/user'
    }
  }]
}
]
