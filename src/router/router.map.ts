import Layout from '@/components/Layout';
import User from '@/views/system/user';
import Home from '@/views/home';
import Resource from '@/views/system/resource';
import Examination from '@/views/project/examination';

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
  path: '/gisDataManager',
  component: Layout,
  meta: {
    title: 'Gis数据管理',
    icon: 'folder',
    path: '/gisDataManager'
  },
  children: [{
    path: 'list',
    component: User,
    meta: {
      title: '数据浏览',
      path: '/gisDataManager/list'
    }
  }, {
    path: 'queryStatisticsy',
    component: User,
    meta: {
      title: '数据查询与统计',
      path: '/gisDataManager/queryStatisticsy'
    }
  }]
}, {
  path: '/boosterProgram',
  component: Layout,
  meta: {
    title: '升压方案',
    icon: 'cloud',
    path: '/boosterProgram'
  },
  children: [{
    path: 'monitor',
    component: User,
    meta: {
      title: '压力监测',
      path: '/boosterProgram/monitor'
    }
  }, {
    path: 'polling',
    component: User,
    meta: {
      title: '调压器(阀门)巡检',
      path: '/boosterProgram/polling'
    }
  }, {
    path: 'planBrowse',
    component: User,
    meta: {
      title: '方案浏览',
      path: '/boosterProgram/planBrowse'
    }
  }]
}, {
  path: '/project',
  component: Layout,
  meta: {
    icon: 'dashboard',
    title: '项目审批',
    path: '/project'
  },
  children: [{
    path: 'create',
    component: User,
    meta: {
      title: '建立项目',
      path: '/project/create'
    }
  }, {
    path: 'design',
    component: User,
    meta: {
      title: '项目设计',
      path: '/project/design'
    }
  }, {
    path: 'construction',
    component: User,
    meta: {
      title: '项目施工',
      path: '/project/construction'
    }
  }, {
    path: 'examination',
    component: Examination,
    meta: {
      title: '项目审批',
      path: '/project/examination'
    }
  }, {
    path: 'acceptance',
    component: User,
    meta: {
      title: '项目验收',
      path: '/project/acceptance'
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
    path: '/system/role',
    component: Home,
    meta: {
      title: '角色',
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
