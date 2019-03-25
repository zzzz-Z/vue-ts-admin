import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        baseUrl: 'list',
        socket: null,
        asyncRoutes: [],
        route: {},
        //从iServer获取的sbbh数组
        ssbms: [],
        tiaoYaQis: [],
        YQLConfig: []
    },
    mutations: {
        saveRoute(state, route) {
            state.route = route
        },
        setTiaoYaQisAndSsbms(state, { ssbms, tiaoYaQis }) {
            ssbms && (state.ssbms = ssbms)
            tiaoYaQis && (state.tiaoYaQis = tiaoYaQis)
        },
        setYQLConfig(state, YQLConfig) {
            YQLConfig && (state.YQLConfig = YQLConfig)
        }

    },
    actions: {
        // setNewRouteList ({ commit, state }, menus) {
        //   menus = JSON.parse(menus)
        //   let _menus = []
        //   let pathList = []
        //   let asyncRoute = []
        //   formatMenus(menus)
        //   pathList = _menus.map(r => r.content)
        //   asyncRoute = filterRouter(routerMap)

        //   state.asyncRoutes = asyncRoute
        //   Router.addRoutes(asyncRoute)
        //   Router.options.routes.push(...asyncRoute)
        //   function formatMenus (arr) {
        //     arr.map(r => {
        //       _menus.push(r)
        //       r.sonResourceList && formatMenus(r.sonResourceList)
        //     })
        //   }
        //   function filterRouter (routes) {
        //     return routes.filter(r => {
        //       if (pathList.includes(r.meta.path)) {
        //         r.meta = { ...r.meta, ..._menus.find(j => j.content === r.meta.path) }
        //         r.children && (r.children = filterRouter(r.children))
        //         return true
        //       }
        //     })
        //   }
        // }
    }
})

