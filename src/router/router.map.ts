import Layout from '@/components/Layout';
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
  }, {
    path: '/table/searchTable',
    component: () => import('@/views/table/searchTable'),
    meta: {
      keepalive: true,
      title: '复杂列表',
    }
  }]
}, {
  path: '/modal',
  component: Layout,
  meta: {
    keepalive: true,
    title: 'modal',
    icon: 'notification',
  },
  children: [{
    path: '/table/vcmodal',
    component: () => import('@/views/modal/vc-modal'),
    meta: {
      keepalive: true,
      title: '表单VC-Modal',
    }
  }, {
    path: '/table/fcmodal',
    component: () => import('@/views/modal/fc-modal'),
    meta: {
      keepalive: true,
      title: '表单FC-modal',
    }
  }]
}, {
  path: '/svg',
  component: Layout,
  meta: {
    keepalive: true,
    title: 'Svg',
    icon: 'bulb',
  },
  children: [{
    path: '/svg',
    component: () => import('@/views/svg'),
    meta: {
      keepalive: true,
      title: 'Svg',
    }
  }]
}, {
  path: '/tree',
  component: Layout,
  meta: {
    keepalive: true,
    title: 'tree',
    icon: 'slack',
  },
  children: [{
    path: '/tree',
    component: () => import('@/views/tree/baseTree'),
    meta: {
      keepalive: true,
      title: 'tree',
    }
  }]
}, {
  path: '/system',
  component: Layout,
  meta: {
    icon: 'user',
    title: '权限管理',
  },
  children: [{
    path: '/system/resource',
    component: Resource,
    meta: {
      keepalive: true,
      title: '资源角色',
    }
  }]
}
];
export default routerMap;
