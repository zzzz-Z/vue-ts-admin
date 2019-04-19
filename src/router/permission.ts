import { RouteConfig } from 'vue-router';
import routerMaps from '@/router/router.map';
import { ValidationRole } from '@/config';

/**
 * @param roleRoutes 权限路由集合
 * @param routerMap   待挂载的路由集合
 * @param children   树节点
 * @param key   唯一key
 * @returns 通过权限过滤后的路由
 */
export function getAsyncRoute({
  roleRoutes,
  routerMap = routerMaps,
  children = 'children',
  key = 'path'
}) {

  // 不需要权限验证时  直接返回完整路由
  if (!ValidationRole) {
    return routerMaps;
  }

  // 传来的权限路由不存在 则返回空[]
  if (!roleRoutes) {
    return [];
  }

  try {
    roleRoutes = JSON.parse(roleRoutes);
  } catch (error) {

  }

  //  对数组进行降维打击
  const afterSqueeze = squeeze(roleRoutes, children);
  // 所有权限路由path集合
  const pathList: string[] = afterSqueeze.map((r) => r[key]);
  // 过滤权限路由
  const asyncRoute = filterRouter(routerMap, key);
  // 递归排序
  sortRoute(asyncRoute);

  return asyncRoute;


  /**
   * @default key =>'path'
   * @param key 服务端传来的路由的路径 通过此字段进行过滤
   * @param routes 待挂载的路由集合
   * @returns 过滤后的路由集合
   */
  function filterRouter(routes: RouteConfig[], key = 'path') {
    return routes.filter((r) => {
      if (pathList.includes(r.meta.path)) {
        const meta = afterSqueeze.find((j) => j[key] === r.meta.path);
        r.meta = { ...r.meta, ...meta };
        r.children && (r.children = filterRouter(r.children));
        return true;
      }
    });
  }

  /**
   *
   * @param routes 待排序的路由集合
   */
  function sortRoute(routes: any[]) {
    routes.sort((a, b) => {
      // tslint:disable: no-unused-expression
      a.children && sortRoute(a.children);
      b.children && sortRoute(b.children);
      return a.meta.sortOrder - b.meta.sortOrder;
    });
  }


}

/**
 * 数组降维
 * @param arr 待降维的数组
 * @param key 需要降维的字段
 * @returns  降维后的一维数组
 */
export function squeeze(arr: any[], key: string = 'children') {
  const newArr: any[] = [];
  function fn(v) {
    v.map((r) => {
      newArr.push(r);
      if (r[key]) {
        fn(r[key]);
      }
    });
  }
  fn(arr);
  return newArr;
}
