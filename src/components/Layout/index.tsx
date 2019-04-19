import { Component, Vue, Provide } from 'vue-property-decorator';
import Siderbar from './siderbar';
import Header from './header';
import './style.less';
import { Logo } from './logo';

@Component({})
export default class Layout extends Vue {

  showView = true;
  collapsed = false;
  /** 全局注入 刷新当前路由 */
  @Provide()
  reloadView() {
    this.showView = false;
    this.$nextTick(() => this.showView = true);
  }

  render() {
    const { collapsed } = this;
    const headerStyle = collapsed ? 'header-fixed fold' : 'header-fixed unfold';
    return (
      <a-layout id='layout' >
        <a-layout-sider
          collapsible
          trigger={null}
          v-model={collapsed}
          width={256}>
          <Logo />
          <Siderbar collapsed={collapsed} />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class={headerStyle}>
            <Header
              collapsed={collapsed}
              change={() => this.collapsed = !this.collapsed} />
          </a-layout-header>
          <a-layout-content>
            {this.showView && <router-view />}
          </a-layout-content>
          <a-layout-footer class='footer'>
            Copyright <a-icon type='copyright' />   2019 地下空间技术部出品
          </a-layout-footer>
        </a-layout>
      </a-layout>
    );
  }
}
