import Layout from '@/components/Layout';
import User from '@/views/system/user';

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
  }]
}
]
export default routerMap
