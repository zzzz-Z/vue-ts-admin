import { Component, Vue } from 'vue-property-decorator'
import Siderbar from './siderbar'
import Header from './header';
import GlobalStore from '@/store/global';
import './style.less'
import Svg from '../Svg';

@Component({})
export default class Layout extends Vue {

  showView = true

  reloadView() {
    this.showView = false
    this.$nextTick(() => this.showView = true)
  }

  render() {
    const headerStyle = GlobalStore.collapsed ? 'header-fixed fold' : 'header-fixed unfold'
    return (
      <a-layout id='layout' >
        <a-layout-sider
          collapsible
          trigger={null}
          v-model={GlobalStore.collapsed}
          width={256}>
          <div class='logo'>
            <Svg name='tiger' />
            <h1 ><Svg name='a_typescript' /> <span>admin</span> </h1>
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
