import { Component, Vue, Provide, Prop, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import GlobalStore from '@/store/global';


type itemConfig = RouteConfig & { icon: string }

@Component({})
export default class Siderbar extends Vue {

  readonly Props!: {
    /** menu是否收起状态 */
    collapsed: boolean
  }
  @Prop() collapsed
  @Provide() openkeys: string[] = []
  @Provide() menuList: any[] = []

  get currnetRoute() {
    return [this.$route.matched[0].path]
  }

  @Watch('collapsed')
  collapsedChange(v) {
    this.openkeys = v ? [] : this.currnetRoute
  }

  created() {
    this.openkeys = this.currnetRoute
  }
  titleClick({ key }) {
    this.openkeys[0] !== key
      ? this.openkeys = [key]
      : this.openkeys = []
  }
  menuClick({ keyPath, key }) {
    if (this.collapsed) {
      this.openkeys = []
    } else {
      keyPath
        ? this.openkeys = [keyPath[keyPath.length - 1]]
        : this.openkeys = []
    }
    this.$router.push(key)
  }
  menuItem(r: itemConfig) {
    return (
      <a-menu-item  key={r.path}>
        {r.icon && <a-icon type={r.icon} />}
        <span>{r.name}</span>
      </a-menu-item >
    )
  }
  subItem(r: itemConfig) {
    return (
      <a-sub-menu
        key={r.path}
        onTitleClick={this.titleClick}
      >
        <span slot='title'>
          <a-icon type={r.icon} />
          <span>{r.name}</span>
        </span>
        {(r.children as itemConfig[]).map((i) => this.menuItem(i))}
      </a-sub-menu>
    )
  }


  render() {
    return (
      <a-menu
        onClick={this.menuClick}
        defaultSelectedKeys={[this.$route.path]}
        openKeys={this.openkeys}
        mode='inline'
        theme='dark'
        style='padding:16px 0' >
        {GlobalStore.asyncRoutes.map((r: itemConfig) => (
          r.children && r.children.length > 0
            ? this.subItem(r)
            : this.menuItem(r)
        ))}
      </a-menu>
    )
  }
}
