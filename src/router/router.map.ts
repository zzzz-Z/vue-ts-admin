import Layout from '@/components/Layout';
import User from '@/views/system/user';
import Resource from '@/views/system/resource';


const routerMap = [{
  path: '/form',
  component: Layout,
  meta: {
    keepalive: true,
    title: '表单页',
    icon: 'form',
  },
  children: [{
    path: '/form/baseForm',
    component: () => import('@/views/form/baseForm'),
    meta: {
      keepalive: true,
      title: '基础表单',
    }
  }, {
    path: '/form/hasValues',
    component: () => import('@/views/form/hasValues'),
    meta: {
      keepalive: true,
      title: '有初始值的表单',
    }
  }, {
    path: '/form/stepForm',
    component: () => import('@/views/form/stepForm'),
    meta: {
      title: '分步表单',
    }
  }]
}, {
  path: '/table',
  component: Layout,
  meta: {
    keepalive: true,
    title: '列表',
    icon: 'table',
  },
  children: [{
    path: '/table/baseTable',
    component: () => import('@/views/table/baseTable'),
    meta: {
      keepalive: true,
      title: '基础列表',
    }
  }]
}, {
  path: '/system',
  component: Layout,
  meta: {
    icon: 'user',
    title: '系统管理',
  },
  children: [{
    path: '/system/user',
    component: User,
    meta: {
      title: '用户',
    }
  }, {
    path: '/system/resource',
    component: Resource,
    meta: {
      keepalive: true,
      title: '资源角色',
    }
  }]
}
]
export default routerMap
