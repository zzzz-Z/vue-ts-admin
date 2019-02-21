import routerMap from './a.js';
import roles from './role.js';

function setNewRouteList({menus}) {
  const _menus = []
  let pathList = []
  let asyncRoute = []
  formatMenus(menus)
  pathList = _menus.map((r) => r.content) // 有权限的路由path集合
  asyncRoute = filterRouter(routerMap) // 过滤权限路由
  console.log(asyncRoute);
  // sortRoute(asyncRoute) // 递归排序

  function formatMenus(arr) {
    arr.map((r) => {
      _menus.push(r)
      r.sonResourceList && formatMenus(r.sonResourceList)
    })
  }
  function filterRouter(routes) {
    return routes.filter((r) => {
      if (pathList.includes(r.meta.path)) {
        console.log(r)
        console.log(r.name)
        console.log(r.path)
        r.meta = { ...r.meta, ..._menus.find((j) => j.content === r.meta.path) }
        r.children && (r.children = filterRouter(r.children))
        return true
      }
    })
  }
  function sortRoute(route) {
    route.sort((a, b) => {
      a.children && sortRoute(a.children)
      b.children && sortRoute(b.children)
      return a.meta.sortOrder - b.meta.sortOrder
    })
  }
}
setNewRouteList(roles)
