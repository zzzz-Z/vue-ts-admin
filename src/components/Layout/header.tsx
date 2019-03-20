import { Panda } from './logo'
import { removeStorage } from '@/utils/storage'
import GlobalStore from '@/store/global'
import ModalGenerator from '../Modal'
import Button from '../Button'

const passwordForm = [{
  label: '密码',
  field: 'oldpasssword'
}, {
  label: '新密码',
  field: 'passsword'
}].map((r: IFormItem) => {
  r.labelCol = { span: 5 }
  r.wrapperCol = { span: 15 }
  return r
})

const Header = () => (
  <div>
    <a-icon
      class='trigger'
      type={GlobalStore.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={GlobalStore.changeCollapsed} />
    <div class='right'>
      <a-dropdown placement='bottomLeft' class='header-dropdown'>
        <span class='user'>
          <a-avatar class='avatar'>
            <Panda />
          </a-avatar>
          <span class='username'>admin</span>
        </span>
        <a-menu slot='overlay'>
          <a-menu-item>
            <a-icon
              onClick={() => { removeStorage(['Token', 'asyncRoutes']), location.href = '/' }}
              type='logout' />
            <span><a style='margin-left:4px'>退出登录</a></span>
          </a-menu-item>
          <a-menu-item>
            <a-icon type='unlock' />
            <span>
              <ModalGenerator
                modal={{ title: '修改密码' }}
                btn={<Button text='修改密码' />}
                formItems={passwordForm}
              />
            </span>
          </a-menu-item>
        </a-menu>
      </a-dropdown> </div>
  </div>
)

export default Header
