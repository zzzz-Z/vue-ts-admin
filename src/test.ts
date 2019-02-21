import routerMap from './com';

export default function setNewRouteList(routerConfig) {
  try {
    routerConfig = JSON.parse(routerConfig)
  } catch (error) {

  }

  const afterSqueeze: any = []
  squeeze()//  对数组进行降维处理
  const pathList: string[] = afterSqueeze.map((r) => r.content)// 有权限的路由path集合
  const asyncRoute = filterRouter(routerMap)  // 过滤权限路由
  console.log(asyncRoute);
  return asyncRoute
  // sortRoute(asyncRoute) // 递归排序


  // 数组降维
  function squeeze( i = routerConfig) {
    i.forEach((r) => {
      afterSqueeze.push(r)
      if (r.sonResourceList) {
        squeeze(r.sonResourceList)
      }
    })
  }
  function filterRouter(routes) {
    return routes.filter((r) => {
      if (pathList.includes(r.meta.path)) {
        const meta = afterSqueeze.find((j) => j.content === r.meta.path)
        r.meta = { ...r.meta, ...meta }
        if (r.children) {
          r.children = filterRouter(r.children)
        }
        return true
      }
    })
  }
  // function sortRoute(route) {
  //   route.sort((a, b) => {
  //     a.children && sortRoute(a.children)
  //     b.children && sortRoute(b.children)
  //     return a.meta.sortOrder - b.meta.sortOrder
  //   })
  // }
}
