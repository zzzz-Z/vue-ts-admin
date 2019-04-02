import { Component, Prop } from 'vue-property-decorator'
import { Form } from 'ant-design-vue';
import { IFormItem } from '@/types/form-item';
import { IFormProps } from '@/types/form';
import VC from '@/VC-vue';
import { FormRef } from '@/types/form-ref';

const props = [
  'layout',
  'formItems',
  'labelCol',
  'col',
  'form',
  'wrapperCol',
  'itemStyle',
  'initialValues'
]


@Component({ props })
class Iform extends VC<IFormProps> {

  @Prop() form!: FormRef

  get renderItem() {
    const { labelCol, wrapperCol, initialValues, itemStyle, col, formItems } = this.$props
    const form = this.form

    return (formItems as IFormItem[]).map((props) => {
      // tslint:disable-next-line:prefer-const
      let { field, rules, initialValue, el } = props

      let element = <a-input type={props.type} placeholder={props.placeholder} />

      el && (element = typeof el === 'function' ? el(form) : el)

      typeof rules === 'function' && (rules = rules(form))

      if (field) {
        initialValues && Object.keys(initialValues).includes(field) && (initialValue = initialValues[field])
        element = form.getFieldDecorator(field, { rules, initialValue })(element)
      }

      const formItemProps = { props: { labelCol, wrapperCol, ...props } }
      const colProps = { props: col }
      const style = props.style || itemStyle

      return (
        <a-col {...colProps} style={style} >
          <a-form-item   {...formItemProps}  >
            {element}
          </a-form-item>
        </a-col>
      )
    })
  }

  render() {
    return (
      <a-row>
        <a-form layout={this.$props.layout} >
          {this.renderItem}
        </a-form>
      </a-row>
    )
  }
}


const MForm = Form.create({ props })(Iform)
const IForm = ({ data }: FC<IFormProps>) => <MForm {...data} />

export default IForm
