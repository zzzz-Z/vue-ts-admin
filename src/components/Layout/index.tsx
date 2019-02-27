import { Component, Vue, Provide } from 'vue-property-decorator'
import Siderbar from './siderbar'
import './index.less'

interface Props { }
@Component({})
export default class extends Vue {
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
          <div class='logo' ></div>
          <Siderbar />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class={this.collapsed ? 'header-fixed fold' : 'header-fixed unfold'}>
          <a-icon
            class='trigger'
            type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={(e) => {
              this.collapsed = !this.collapsed
            }}
        />
          </a-layout-header>
          <a-layout-content>
            <router-view />
          </a-layout-content>
          <a-layout-footer>
            <div class='footer' >
              <div>
                Copyright <a-icon type='copyright' />   2019 村头tony体验技术部出品
              </div>
            </div>
          </a-layout-footer>
        </a-layout>
      </a-layout>
    )
  }
}
