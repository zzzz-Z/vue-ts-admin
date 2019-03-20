import { Component, Vue, Prop } from 'vue-property-decorator'
import { Form } from 'ant-design-vue';


@Component({})
class IForm extends Vue {

  readonly Props!: IFormProps
  @Prop(String) layout
  /** formItems props  */
  @Prop({ required: true }) formItems!: IFormItem[]
  /** 所有item的labelCol  会被单项指定值覆盖 */
  @Prop() labelCol?: any
  /** item col 配置 */
  @Prop() col?: any
  /** 所有item的wrapperCol 会被单项指定值覆盖 */
  @Prop() wrapperCol?: any
  /** 所有formitem的style 若指定formItems的style属性 则被覆盖 */
  @Prop() itemStyle?: string
  /**  初始值 ,设置所有表单项的初始值 && 合并修改后的表单数据 */
  @Prop() initialValues?: object
  /** 表单实例 */
  @Prop() form?: any

  get renderItem() {
    const { labelCol, wrapperCol, initialValues, form, itemStyle, col } = this
    return this.formItems.map((props) => {
      // tslint:disable-next-line:prefer-const
      let { field, rules, initialValue, el } = props
      let element = el ? el(form) : <a-input {...{ attr: props }} />
      typeof rules === 'function' && (rules = rules(form))
      if (field) {
        if (initialValues && Object.keys(initialValues).includes(field)) {
          initialValue = initialValues[field]
        }
        element = form.getFieldDecorator(field, { rules, initialValue })(element)
      }
      props = { labelCol, wrapperCol, ...props }
      const style = props.style || itemStyle

      return (
        <a-col {...{ props: col }} style={style} >
          <a-form-item   {...{ props }}  >
            {element}
          </a-form-item>
        </a-col>
      )
    })
  }

  render() {
    return (
      <a-row>
        <a-form layout={this.layout} >
          {this.renderItem}
        </a-form>
      </a-row>
    )
  }
}

const props = [
  'layout',
  'formItems',
  'labelCol',
  'col',
  'wrapperCol',
  'itemStyle',
  'initialValues'
]

export default Form.create({ props })(IForm)
