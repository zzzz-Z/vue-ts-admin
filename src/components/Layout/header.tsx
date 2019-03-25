import { Panda } from './logo'
import GlobalStore from '@/store/global'
import ModalGenerator from '../Modal'
import Button from '../Button'
import Svg from '../Svg';
import router from '@/router';

const ChangePassWord = () => (
  <span>
    <ModalGenerator
      modal={{ title: '修改密码' }}
      btn={<Button text='修改密码' />}
      formProps={{
        labelCol: { sapn: 5 },
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

export default () => (
  <div>
    <a-icon
      class='trigger'
      type={GlobalStore.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={GlobalStore.changeCollapsed} />
    <div class='right'>
      <a-tooltip title='专题图'>
        <Svg name='map' class='svgmap' onClick={() => router.push('/overView')} />
      </a-tooltip>
      <a-dropdown placement='bottomLeft' class='header-dropdown'>
        <span class='user'>
          <a-avatar class='avatar'> <Panda /> </a-avatar>
          <span class='username'>admin</span>
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
            <ChangePassWord />
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
)
