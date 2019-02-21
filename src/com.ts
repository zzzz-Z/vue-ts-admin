import Layout from '@/components/Layout';
import home from './views/home';
const rou = [ {
  path: '/logmanage',
  name: 'logmanage',
  component: Layout,
  meta: {
    path: '/logmanage',
    name: 'logmanage'
  },
  children: [{
    path: 'operate',
    name: 'operate',
    component: home,
    meta: {
      path: '/logmanage/operate',
      name: 'operate'
    }
  }]
}, {
  path: '/system',
  name: 'system',
  component: Layout,
  meta: {
    path: '/system',
    name: 'system'
  },
  children: [{
    path: 'user',
    name: 'system1',
    component: home,
    meta: {
      path: '/system/user',
      name: 'user'
    }
  }]
}]
export default    rou
