import { Component, Vue, Provide } from 'vue-property-decorator'
import Siderbar from './siderbar'
import Header from './header';
import GlobalStore from '@/store/global';
import './style.less'

@Component({})
export default class Layout extends Vue {

  @Provide() showView = true

  reloadView() {
    this.showView = false
    this.$nextTick(() => this.showView = true)
  }

  render() {
    const headerStyle = GlobalStore.collapsed ? 'header-fixed fold' : 'header-fixed unfold'
    const logoImg = require('@/assets/img/logo.png')
    return (
      <a-layout id='layout' >
        <a-layout-sider
          collapsible
          trigger={null}
          v-model={GlobalStore.collapsed}
          width={256}>
          <div class='logo'>
            <img src={logoImg} />
            <h1 ></h1>
          </div>
          <Siderbar
            onShouldReload={this.reloadView}
            collapsed={GlobalStore.collapsed} />
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
