import Vue from 'vue'
import Vuex from 'vuex'
import { setStorage } from './utils/storage';

Vue.use(Vuex)

interface State {
  asyncRoutes: any[]
}
export default new Vuex.Store<State>({
  state: {
    asyncRoutes: []
  },
  mutations: {
    saveAsyncRoutes(state, asyncRoutes: any[]) {
      setStorage('asyncRoutes', asyncRoutes)
      state.asyncRoutes = asyncRoutes
    }
  }
})
