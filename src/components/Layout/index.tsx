import { Component, Vue, Provide } from 'vue-property-decorator'
import Siderbar from './siderbar'
import './index.less'
import { Heart, Panda } from './logo';

interface Props { }
@Component({})
export default class Layout extends Vue {
  readonly Props!: Props
  @Provide() collapsed = false

  render() {
    return (
      <a-layout id='layout' >
        <a-layout-sider
          collapsible
          trigger={null}
          v-model={this.collapsed}
          width={256}>
          <div class='logo'>
            {/* <Heart style='color:hotpink;font-size:20px' /> */}
            <Panda style='font-size:30px;vertical-align: middle' />
            <h1 >Design by Tony</h1>
          </div>
          <Siderbar collapsed={this.collapsed} />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class={this.collapsed ? 'header-fixed fold' : 'header-fixed unfold'}>
            <a-icon
              class='trigger'
              type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={(e) => this.collapsed = !this.collapsed}
            />
          </a-layout-header>
          <a-layout-content>
            <router-view />
          </a-layout-content>
          <a-layout-footer class='footer'>
            Copyright <a-icon type='copyright' />   2019 村头tony体验技术部出品
          </a-layout-footer>
        </a-layout>
      </a-layout>
    )
  }
}
