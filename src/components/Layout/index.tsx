import { Component, Vue, Provide } from 'vue-property-decorator'
import './index.less'
import Siderbar from './Siderbar';

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
          <Siderbar menuList={this.menuList} />
        </a-layout-sider>
        <a-layout>
          <a-layout-header>
          </a-layout-header>
          <a-layout-content>
            <router-view></router-view>
          </a-layout-content>
          <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
      </a-layout>
    )
  }
}
