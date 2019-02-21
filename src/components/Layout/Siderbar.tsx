import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { Menu } from 'ant-design-vue';
import { RouteConfig } from 'vue-router';

type itemConfig = RouteConfig & { icon: string }
interface Props {
  menuList: itemConfig[]
}

@Component({
  components: {
    AMenu: Menu,
    AItem: Menu.Item,
    ASubItem: Menu.SubMenu
  }
})
export default class Siderbar extends Vue {
  readonly Props!: Props

  @Prop() menuList!: itemConfig[]
  @Provide() openkeys: string[] = []

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
      <a-sub-item ref='sub' key={r.path} onTitleClick={(e) => this.openkeys = [e.key]} >
        <span slot='title'>
          <a-icon type={r.icon} />
          <span>{r.name}</span>
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

  created() {
    this.openkeys = [this.$route.matched[0].path]
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
