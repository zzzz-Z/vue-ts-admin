import { Panda } from './logo'
import GlobalStore from '@/store/global'
import ModalGenerator from '../Modal'
import Button from '../Button'
import Svg from '../Svg';
import router from '@/router';
import { Vue, Inject, Component } from 'vue-property-decorator';


@Component({})
export default class Header extends Vue {

  /** menu是否收起状态 */
  @Inject() collapsed!: boolean
  @Inject() changeCollapsed!: () => void

  get ChangePassWord() {
    return (
      <span>
        <ModalGenerator
          modal={{ title: '修改密码' }}
          btn={<Button text='修改密码' />}
          formProps={{
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
            formItems: [{
              label: '密码',
              field: 'oldpasssword'
            }, {
              label: '新密码',
              field: 'passsword'
            }]
          }}
        />
      </span>
    )
  }

  render() {
    return (
      <div>
        <a-icon
          class='trigger'
          type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.changeCollapsed} />
        <div class='right'>
          <a-tooltip title='专题图'>
            <Svg name='map' class='svgmap' onClick={() => router.push('/overView')} />
          </a-tooltip>
          <a-dropdown placement='bottomLeft' class='header-dropdown'>
            <span class='user'>
              <a-avatar class='avatar'> <Panda /> </a-avatar>
              <span class='username'>{GlobalStore.userInfo.name}</span>
            </span>
            <a-menu slot='overlay'>
              <a-menu-item>
                <a-icon type='logout' />
                <span onClick={GlobalStore.logout} >
                  <a style='margin-left:4px'>退出登录</a>
                </span>
              </a-menu-item>
              <a-menu-item>
                <a-icon type='unlock' />
                {this.ChangePassWord}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    )
  }
}

