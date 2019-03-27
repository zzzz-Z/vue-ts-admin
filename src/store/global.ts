import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setStorage, removeStorage } from '../utils/storage'
import { getAsyncRoute } from '@/router/permission'
import { message } from 'ant-design-vue'
import { login } from '@/api/user'
import store from './index'
import router from '@/router'

interface UserInfo {
  name?: string
}
@Module({ dynamic: true, store, name: 'GlobalStore' })
class Global extends VuexModule {
  /** 路由表 */
  asyncRoutes: any[] = []
  userInfo: UserInfo = {
    name: 'admin'
  }

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
  logout() {
    removeStorage()
    window.location.href = '/'
  }


  @Action
  async login(payload = {}) {
    const res = await login(payload)
    Number(res.code) ?
      (setStorage('Token', res.token),
        this.saveAsyncRoutes(res.menus),
        router.push('/system/user'))
      : message.error(res.msg)
  }

}
/**  Global Vuex */
const GlobalStore = getModule(Global)
export default GlobalStore
