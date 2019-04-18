import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from '@/store/global';
import { removeStorage } from '@/utils/storage';
import { FormUtils } from '@/types/form-ref';
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
  form!: FormUtils
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
      GlobalStore.login(params).finally(() => this.loading = false)
      this.$router.push('/form/baseForm')
    })
  }

  beforeCreate() {
    removeStorage()
    this.form = this.$form.createForm(this)
  }

  render() {

    return (
      <a-row type='flex' justify='center' id='login'>
        <a-col xxl={5} xl={8}  sm={13} xs={20} >
          <a-form  class='login-form'  >
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
        </a-col>
      </a-row>
    )
  }
}
