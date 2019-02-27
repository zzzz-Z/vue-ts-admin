import { Component, Vue, Provide } from 'vue-property-decorator'
import { Menu } from 'ant-design-vue'
import { RouteConfig } from 'vue-router'
import routerMap from '@/router/router.map'
import GlobalStore from '@/store/global';


type itemConfig = RouteConfig & { icon: string }

@Component({
  components: {
    AMenu: Menu,
    AItem: Menu.Item,
    ASubItem: Menu.SubMenu
  }
})
export default class Siderbar extends Vue {

  @Provide() openkeys: string[] = []
  @Provide() menuList: any[] = []

  created() {
    this.openkeys = [this.$route.matched[0].path]
    this.menuList = GlobalStore.asyncRoutes
  }
  titleClick({ key }) {
    this.openkeys[0] !== key
      ? this.openkeys = [key]
      : this.openkeys = []
  }
  menuClick({ keyPath, key }) {
    keyPath
      ? this.openkeys = [keyPath[keyPath.length - 1]]
      : this.openkeys = []
    this.$router.push(key)
  }
  menuItem(r: itemConfig) {
    return (
      <a-item key={r.path}>
        {r.icon && <a-icon type={r.icon} />}
        <span>{r.name}</span>
      </a-item>
    )
  }
  subItem(r: itemConfig) {
    return (
      <a-sub-item
        key={r.path}
        onTitleClick={this.titleClick}
      >
        <span slot='title'>
          <a-icon type={r.icon} />
          <span>{r.name}</span>
        </span>
        {(r.children as itemConfig[]).map((i) => this.menuItem(i))}
      </a-sub-item>
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
        {this.menuList.map((r: itemConfig) => (
          r.children && r.children.length > 0
            ? this.subItem(r)
            : this.menuItem(r)
        ))}
      </a-menu>
    )
  }
}
