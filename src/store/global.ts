/**
 * 全局变量
 */

import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setStorage } from '../utils/storage';
import store from './index';
import router from '@/router';
import { getAsyncRoute } from '@/router/permission';


@Module({ dynamic: true, store, name: 'GlobalStore' })
class Global extends VuexModule {
  /** 路由表 */
  asyncRoutes: any[] = []
  userInfo = {}
  collapsed = false

  @Mutation
  saveAsyncRoutes(asyncRoutes: any) {
    const routes = getAsyncRoute(asyncRoutes)
    router.addRoutes(routes)
    setStorage('asyncRoutes', asyncRoutes)
    this.asyncRoutes = routes
  }

  @Mutation
  saveUserInfo(userInfo: {}) {
    this.userInfo = userInfo
  }

  @Mutation
  changeCollapsed() {
    this.collapsed = !this.collapsed
  }


  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return 5
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return 5
  }
}
/**
 * 全局变量 Vuex
 */
const GlobalStore = getModule(Global)
export default GlobalStore
