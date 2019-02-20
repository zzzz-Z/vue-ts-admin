import { Component, Vue, Prop } from 'vue-property-decorator'
import config from '@/config';
import ButtonProps from './type';


@Component({})
export default class Button extends Vue {

  readonly Props!: ButtonProps
  @Prop() role
  @Prop() text
  @Prop() html
  @Prop() config

  render() {
    const isShow = () => {
      if (!config.validationRole) {
        return true
      } else {
        // 验证按钮权限
        return false
      }
    }
    return isShow && (
      this.text ?
        <a  > {this.text} </a> :
        <a-button
          {...{ props: this.config }} >
          {this.html}
        </a-button>
    )
  }
}
