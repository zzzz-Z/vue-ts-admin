import { Component, Prop } from 'vue-property-decorator';
import { VC } from '@/VC-vue';
import { GlobalStore } from '@/store/global'
import { ModalGenerator } from '../Modal'
import Svg from '../Svg';
import router from '@/router';

interface Props {
  collapsed: boolean
  change?: () => any
}
@Component({})
export default class Header extends VC<Props> {
  /** menu是否收起状态 */
  @Prop() collapsed!: boolean
  @Prop() change!: () => any

  get ChangePassWord() {
    return (
      <span>
        <ModalGenerator
          title='修改密码'
          btn={<a v-text='修改密码' />}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          formItems={[{
            label: '密码',
            field: 'oldpasssword'
          }, {
            label: '新密码',
            field: 'passsword'
          }]}
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
          onClick={this.change} />
        <div class='right'>
          <a-dropdown placement='bottomLeft' class='header-dropdown'>
            <span class='user'>
              <a-avatar class='avatar'><Svg name='admin' /> </a-avatar>
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

