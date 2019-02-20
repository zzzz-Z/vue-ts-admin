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

  get defaultSelectedKeys() {
    return this.$route.matched.map((r) => r.path)
  }

  menuItem(r: itemConfig) {
    return (
      <a-item key={r.path}>
        {r.icon && <a-icon type={r.icon} />}
        <span class='jumper'>{r.name}</span>
      </a-item>
    )
  }
  subItem(r: itemConfig) {
    return (
      <a-sub-item onTitleClick={(e) => this.openkeys = [e.key]} >
        <span slot='title'>
          <a-icon type={r.icon} />
          <span>{r.name}</span>
        </span>
        {(r.children as itemConfig[]).map((i) => this.menuItem(i))}
      </a-sub-item>
    )
  }

  render() {
    console.log(this.$route);
    console.log(this.defaultSelectedKeys);
    return (
      <a-menu
        onClick={({ keyPath }) => {
          keyPath ?
            this.openkeys = [keyPath[keyPath.length - 1]] :
            this.openkeys = []
        }}
        selectedKeys={this.defaultSelectedKeys}
        defaultOpenKeys={['logmanage']}
        defaultSelectedKeys={this.defaultSelectedKeys}
        openKeys={this.openkeys}
        mode='inline'
        style='height:100%;padding-top:60px' >
        {this.menuList.map((r: itemConfig) => (
          r.children && r.children.length > 0
            ? this.subItem(r)
            : this.menuItem(r)
        ))}
      </a-menu>
    )
  }
}
