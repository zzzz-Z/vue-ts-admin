import { Component, Vue } from 'vue-property-decorator';
import GlobalStore from '@/store/global';
import { removeStorage } from '@/utils/storage';
import { FormRef } from '@/types/form-ref';
import './style.less'

@Component({})
export default class Login extends Vue {


  formItemLayout = {
    labelCol: {
      span: 1
    },
    wrapperCol: {
      span: 23
    }
  }
  form!: FormRef
  loading: any = false

  onEnter(e) {
    if (e.keyCode !== 13) {
      return
    }
    this.login()
  }

  login() {
    this.loading = true
    this.form.validateFields((err, params) => {
      GlobalStore.login(params)
        .finally(() => this.loading = false)
    })
  }

  beforeCreate() {
    removeStorage()
    this.form = this.$form.createForm(this)
  }

  render() {

    return (
      <div onKeydown={this.onEnter} id='login' >
        <a-row class='content'>
          <a-col span={12} > <img src={require('@/assets/images/longin1.png')} /></a-col>
          <a-col span={12} >
            <a-form class='form' style='width:300px' >
              <img src={require('@/assets/images/longin2.png')} />
              <a-form-item  {...{ props: this.formItemLayout }} >
                {this.form.getFieldDecorator('username', {})(
                  <a-input placeholder='请输入用户名' prefix={<a-icon type='user' />} />
                )}
              </a-form-item>
              <a-form-item {...{ props: this.formItemLayout }} >
                {this.form.getFieldDecorator('password', {})(
                  <a-input placeholder='请输入密码' type='password' prefix={<a-icon type='key' />} />
                )}
              </a-form-item>
              <a-form-item {...{ props: this.formItemLayout }} >
                <a-button
                  loading={this.loading}
                  size='large'
                  style='width:100%'
                  type='primary'
                  onClick={this.login}
                >登录</a-button>
              </a-form-item>
            </a-form>
          </a-col >
        </a-row >
      </div >
    )
  }
}
