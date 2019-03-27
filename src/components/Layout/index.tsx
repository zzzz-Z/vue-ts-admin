import { Component, Vue, Provide } from 'vue-property-decorator'
import Siderbar from './siderbar'
import Header from './header'
import Svg from '../Svg'
import './style.less'


@Component({})
export default class Layout extends Vue {

  showView = true
  @Provide() collapsed = false
  @Provide()
  changeCollapsed() {
    this.collapsed = !this.collapsed
  }
  reloadView() {
    this.showView = false
    this.$nextTick(() => this.showView = true)
  }

  render() {
    const { collapsed } = this
    const headerStyle = collapsed ? 'header-fixed fold' : 'header-fixed unfold'
    return (
      <a-layout id='layout' >
        <a-layout-sider
          collapsible
          trigger={null}
          v-model={collapsed}
          width={256}>
          <div class='logo'>
            <Svg name='sunny' />
          </div>
          <Siderbar onShouldReload={this.reloadView} />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class={headerStyle}>
            <Header />
          </a-layout-header>
          <a-layout-content>
            {this.showView && <router-view />}
          </a-layout-content>
          <a-layout-footer class='footer'>
            Copyright <a-icon type='copyright' />   2019 地下空间技术部出品
          </a-layout-footer>
        </a-layout>
      </a-layout>
    )
  }
}
