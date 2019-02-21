import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import { Props, FormItem } from './type';


@Component({})
export default class Form extends Vue {

  readonly Props!: Props
  @Prop(String) layout
  @Prop({ required: true }) formItems!: FormItem[] /** formItem 配置  */
  @Prop() labelCol?: any // 所有item的labelCol
  @Prop() wrapperCol?: any // 所有item的wrapperCol
  @Prop() iStyle?: string
  @Provide() form?: any  /** 表单实例 */

  /**  每一项的初始值 ,用于合并修改后的表单数据 */
  get initialValues() {
    const o: object = {}
    this.formItems.map((r) => r.field && r.initialValue && (o[r.field] = r.initialValue))
    return o
  }
  created() {
    this.form = this.$form.createForm(this)
  }
  render() {
    return (
      <a-row>
        <a-form layout={this.layout} >
          {this.formItems.map((props) => {
            const rules = (
              typeof props.rules === 'function' ?
                props.rules(this.form) :
                props.rules
            )
            const element = (
              props.el ?
                props.el(this.form) :
                <a-input type={props.type} />
            )
            props = {
              labelCol: this.labelCol,
              wrapperCol: this.wrapperCol,
              ...props
            }
            return (
              <a-col style={this.layout !== 'inline' || 'display:inline-block'}>
                <a-form-item  {...{ props }} style={props.style || this.iStyle} >
                  {
                    props.field ?
                      this.form.getFieldDecorator(props.field, { rules, initialValue: props.initialValue })(element) :
                      element
                  }
                </a-form-item>
              </a-col>
            )
          })
          }
        </a-form>
      </a-row>
    )
  }
}
