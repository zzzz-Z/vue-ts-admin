import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import { Props, FormItem } from './type';


@Component({})
export default class Form extends Vue {

  readonly Props!: Props
  @Prop(String) layout
  /** formItems props  */
  @Prop({ required: true }) formItems!: FormItem[]
  /** 所有item的labelCol  会被单项指定值覆盖 */
  @Prop() labelCol?: any
  /** 所有item的wrapperCol 会被单项指定值覆盖 */
  @Prop() wrapperCol?: any
  /** 所有formitem的style 若指定formItems的style属性 则被覆盖 */
  @Prop() iStyle?: string
  /**  初始值 ,用于合并修改后的表单数据 */
  @Prop() initialValues?: object
  /** 表单实例 */
  @Provide() form?: any


  created() {
    this.form = this.$form.createForm(this)
  }
  renderItem() {
    return this.formItems.map((props) => {
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
        <a-form-item  {...{ props }} style={props.style || this.iStyle} >
          {
            props.field ?
              this.form.getFieldDecorator(props.field, { rules, initialValue: props.initialValue })(element) :
              element
          }
        </a-form-item>
      )
    })
  }
  render() {
    return (
      <a-row>
        <a-form layout={this.layout} >
          <a-col style={this.layout !== 'inline' || 'display:inline-block'}>
            {this.renderItem()}
          </a-col>
        </a-form>
      </a-row>
    )
  }
}
