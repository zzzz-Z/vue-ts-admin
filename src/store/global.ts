import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setStorage } from '../utils/storage';
import store from './index';
import router from '@/router';
import getAsyncRoute from '@/router/permission';

@Module({ dynamic: true, store, name: 'GlobalStore' })
class Global extends VuexModule {
  asyncRoutes: any[] = []

  @Mutation
  saveAsyncRoutes(asyncRoutes: any) {
    router.addRoutes(getAsyncRoute(asyncRoutes))
    setStorage('asyncRoutes', asyncRoutes)
    this.asyncRoutes = asyncRoutes
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

const GlobalStore = getModule(Global)
export default  GlobalStore
