import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface State {
  requestMap: string[]
}
export default new Vuex.Store<State>({
  state: {
    requestMap: []
  },
  mutations: {
    addRequest(state, url: string) {
      state.requestMap.push(url)
    },
    removeRequest(state, num: number) {
      state.requestMap.splice(num, 1)
    }
  }
})
