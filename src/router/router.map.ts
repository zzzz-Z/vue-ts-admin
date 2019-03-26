import Layout from '@/components/Layout';
import User from '@/views/system/user';
import Home from '@/views/home';
import Resource from '@/views/system/resource';
import Examination from '@/views/project/examination';

const routerMap = [{
  path: '/form',
  component: Layout,
  meta: {
    name: '表单页',
    icon: 'form',
    path: '/form'
  },
  children: [{
    path: '',
    component: () => import('@/views/form'),
    meta: {
      name: '表单页',
      path: '/form'
    }
  }]
}, {
  path: '/gisDataManager',
  component: Layout,
  meta: {
    name: 'Gis数据管理',
    icon: 'folder',
    path: '/gisDataManager'
  },
  children: [{
    path: 'list',
    component: User,
    meta: {
      name: '数据浏览',
      path: '/gisDataManager/list'
    }
  }, {
    path: 'queryStatisticsy',
    component: User,
    meta: {
      name: '数据查询与统计',
      path: '/gisDataManager/queryStatisticsy'
    }
  }]
}, {
  path: '/boosterProgram',
  component: Layout,
  meta: {
    name: '升压方案',
    icon: 'cloud',
    path: '/boosterProgram'
  },
  children: [{
    path: 'monitor',
    component: User,
    meta: {
      name: '压力监测',
      path: '/boosterProgram/monitor'
    }
  }, {
    path: 'polling',
    component: User,
    meta: {
      name: '调压器(阀门)巡检',
      path: '/boosterProgram/polling'
    }
  }, {
    path: 'planBrowse',
    component: User,
    meta: {
      name: '方案浏览',
      path: '/boosterProgram/planBrowse'
    }
  }]
}, {
  path: '/project',
  component: Layout,
  meta: {
    icon: 'dashboard',
    name: '项目审批',
    path: '/project'
  },
  children: [{
    path: 'create',
    component: User,
    meta: {
      name: '建立项目',
      path: '/project/create'
    }
  }, {
    path: 'design',
    component: User,
    meta: {
      name: '项目设计',
      path: '/project/design'
    }
  }, {
    path: 'construction',
    component: User,
    meta: {
      name: '项目施工',
      path: '/project/construction'
    }
  }, {
    path: 'examination',
    component: Examination,
    meta: {
      name: '项目审批',
      path: '/project/examination'
    }
  }, {
    path: 'acceptance',
    component: User,
    meta: {
      name: '项目验收',
      path: '/project/acceptance'
    }
  }]
}, {
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
    path: 'role',
    name: 'role',
    component: Home,
    meta: {
      name: '角色',
      path: '/system/role'
    }
  }, {
    path: 'resource',
    component: Resource,
    meta: {
      name: '资源角色',
      path: '/system/resource'
    }
  }]
}
]
export default routerMap
