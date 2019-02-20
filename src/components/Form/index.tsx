import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import { Props, FormItem } from './type';


@Component({})
export default class Form extends Vue {

  readonly Props!: Props
  @Prop(String) layout
  /** formItem 配置  */
  @Prop({ required: true }) formItems!: FormItem[]
  /** 表单实例 */
  @Provide() form?: any
  @Provide() labelCol: object = { span: 5 }
  @Provide() wrapperCol: object = { span: 14 }

  get colStyle() {
    return this.layout === 'inline' ? 'display:inline-block' : ''
  }
  /**  每一项的初始值 ->用于合并修改后的表单数据 */
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
            const rules = typeof (props.rules) === 'function' ?
              props.rules(this.form) :
              props.rules
            const element = props.el ? props.el(this.form) : <a-input type={props.type} />
            props = {
              labelCol: this.labelCol,
              wrapperCol: this.wrapperCol,
              ...props
            }
            return (
              <a-col {...{ props }} style={this.colStyle} >
                <a-form-item  {...{ props }}  >
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
