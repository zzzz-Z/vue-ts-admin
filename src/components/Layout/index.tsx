import './style.less';
import { Component, Vue, Provide } from 'vue-property-decorator';
import Siderbar from './siderbar';
import Header from './header';

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
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  get Content() {
    const view = this.$route.meta.keepalive
      ? (<keep-alive>  <router-view />  </keep-alive>)
      : <router-view />;
    console.log(view);
    return this.showView && <a-layout-content>{view}</a-layout-content>;
  }

  render() {
    const { collapsed, toggleCollapsed, Content } = this;
    return (
      <a-layout id='layout' >
        <Siderbar collapsed={collapsed} />
        <a-layout>
          <Header collapsed={collapsed} change={toggleCollapsed} />
          {Content}
          <a-layout-footer class='footer'>
            Copyright <a-icon type='copyright' />   2019 地下空间技术部出品
          </a-layout-footer>
        </a-layout>
      </a-layout>
    );
  }
}
