import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import './style.less'
import GlobalStore from '@/store/global';

@Component({})
export default class Login extends Vue {

  @Provide() username: string = ''
  @Provide() password: string = ''

  @Watch('username')
  wusername(v) {
    this.styleChange(v, 'username')
  }

  @Watch('password')
  wpwd(v) {
    this.styleChange(v, 'pwd')
  }

  styleChange(v, ref: string) {
    const style = (this.$refs[ref] as any).style
    if (v === '') {
      style.top = '27px'
      style.color = '#ccc'

    } else {
      style.top = '5px'
      style.color = '#000'
    }
  }

  login() {
    if (this.username !== 'tony') {
      this.$message.error('用户名错误！')
      return
    }
    this.Axios.get('/user.json').then((res: any) => {
      if (!res.errorCode) {
        this.$message.success(res.message)
        GlobalStore.saveAsyncRoutes(res.role)
        this.$router.push('/system/user')
      } else {
        this.$message.error('登录失败:' + res.message)
      }
    })

  }

  render() {

    return (
      <a-row type='flex'>
        <a-col lg={{ span: 4 }} md={{ span: 10 }} sm={{ span: 20 }} id='login'>
          <div onKeydown={(e) => e.keyCode === 13 && this.login()} >
            <p>
              <span class='bold'> Design by </span>Village barber <span style='color:#000' >Tony</span> &
              <a-icon type='heart' theme='twoTone' twoToneColor='#eb2f96' />
            </p>
            <div class='input' >
              <input autofocus='autofocus' v-model={this.username} ></input>
              <div class='bottom'></div>
              <div ref='username' class='label'>Username</div>
            </div>
            <div class='input' >
              <input v-model={this.password} ></input>
              <div class='bottom'></div>
              <div ref='pwd' class='label'>Password</div>
            </div>
            <a-button onClick={this.login} class='button'>登录</a-button>
          </div>
        </a-col>
      </a-row>
    )
  }
}
