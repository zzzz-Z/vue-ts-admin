import { Component, Vue, Provide, Prop } from 'vue-property-decorator'


@Component({})
export default class Form extends Vue {

  readonly Props!: IFormProps
  @Prop(String) layout
  /** formItems props  */
  @Prop({ required: true }) formItems!: FormItem[]
  /** 所有item的labelCol  会被单项指定值覆盖 */
  @Prop() labelCol?: any
  /** item col 配置 */
  @Prop() col?: any
  /** 所有item的wrapperCol 会被单项指定值覆盖 */
  @Prop() wrapperCol?: any
  /** 所有formitem的style 若指定formItems的style属性 则被覆盖 */
  @Prop() itemStyle?: string
  /**  初始值 ,用于合并修改后的表单数据 */
  @Prop() initialValues?: object
  /** 表单实例 */
  @Provide() form?: any


  created() {
    this.form = this.$form.createForm(this)
  }
  renderItem() {
    const { labelCol, wrapperCol } = this
    return this.formItems.map((props) => {

      const rules = typeof props.rules === 'function' ? props.rules(this.form) : props.rules
      const element = props.el ? props.el(this.form) : <a-input type={props.type} />
      const ItemElement = !props.field ? element :
        this.form.getFieldDecorator(props.field, { rules, initialValue: props.initialValue })(element)
      props = { labelCol, wrapperCol, ...props }

      return (
        <a-col {...{ props: this.col }} >
          <a-form-item
            {...{ props }}
            style={props.style || this.itemStyle} >
            {ItemElement}
          </a-form-item>
        </a-col>
      )
    })
  }
  render() {
    return (
      <a-row>
        <a-form layout={this.layout} >
          {this.renderItem()}
        </a-form>
      </a-row>
    )
  }
}
