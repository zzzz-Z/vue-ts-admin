import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Breadcrumb extends Vue {

  render() {
    let routes = this.$route.matched
    if (routes.length > 1) {
      if (routes[0].path === routes[1].path) {
        routes = [routes[0]]
      }
    }
    return (
      <a-breadcrumb style='background:#fff;padding:15px 25px;border-bottom:1px solid #F0F0F0;margin-bottom:20px'>
        {routes.map((r, i) => (
          <a-breadcrumb-item key={i} >
            {
              r.name === this.$route.name ?
                <span >{r.meta.name} </span> :
                <router-link to={r.path}  >{r.meta.name}</router-link>
            }
          </a-breadcrumb-item>
        ))}
      </a-breadcrumb>
    )
  }
}

