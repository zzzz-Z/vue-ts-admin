import { Component, Vue, Provide } from 'vue-property-decorator'
import { Menu } from 'ant-design-vue'
import { RouteConfig } from 'vue-router'
import routerMap from '@/router/router.map'


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
    this.menuList = routerMap
  }

  menuItem(r: itemConfig) {
    return (
      <a-item key={r.meta.path}>
        {r.icon && <a-icon type={r.icon} />}
        <span>{r.meta.name}</span>
      </a-item>
    )
  }
  subItem(r: itemConfig) {
    return (
      <a-sub-item
        key={r.meta.path}
        onTitleClick={(e) => this.openkeys = this.openkeys[0] === e.key ? [] : [e.key]} >
        <span slot='title'>
          <a-icon type={r.meta.icon} />
          <span>{r.meta.name}</span>
        </span>
        {(r.children as itemConfig[]).map((i) => this.menuItem(i))}
      </a-sub-item>
    )
  }
  menuClick({ keyPath, key }) {
    keyPath ?
      this.openkeys = [keyPath[keyPath.length - 1]] :
      this.openkeys = []
    this.$router.push(key)

  }

  render() {
    return (
      <a-menu
        onClick={this.menuClick}
        defaultSelectedKeys={[this.$route.path]}
        openKeys={this.openkeys}
        mode='inline'
        theme='light'
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
