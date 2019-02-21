import { Component, Vue, Provide } from 'vue-property-decorator'
import Siderbar from './Siderbar'
import './index.less'

interface Props { }
@Component({})
export default class extends Vue {
  readonly Props!: Props

  @Provide() menuList = []
  created() {
    this.Axios.get('/role.json').then((res: any) => {
      this.menuList = res
    })
  }
  render() {
    return (
      <a-layout id='components-layout-demo-basic' >
        <a-layout-sider width={220}>
          <div class='logo' ></div>
          <Siderbar menuList={this.menuList} />
        </a-layout-sider>
        <a-layout>
          <a-layout-header>
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
