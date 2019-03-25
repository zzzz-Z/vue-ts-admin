/**
 * 全局变量
 */

import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setStorage, removeStorage } from '../utils/storage';
import store from './index';
import router from '@/router';
import { getAsyncRoute } from '@/router/permission';
import request from '@/utils/request';
import { RouteConfig } from 'vue-router';
import { message } from 'ant-design-vue';


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


  @Action
  login(payload) {
    return request.get('/home/login', { params: { ...payload, qt: 1 } })
      .then((res: any) => {
        if (Number(res.code)) {
          setStorage('Token', res.token)
          this.saveAsyncRoutes(res.menus)
          router.push('/system/user')
        } else {
          message.error(res.msg)
        }
      })

  }

  @Action
  logout() {
    removeStorage()
    window.location.href = '/'
  }
}
/**
 * 全局变量 Vuex
 */
const GlobalStore = getModule(Global)
export default GlobalStore
