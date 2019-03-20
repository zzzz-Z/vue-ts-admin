import IForm from '../Form'
import { Component, Vue, Prop } from 'vue-property-decorator'
interface Props {
  layout?: 'horizontal' | 'inline' | 'vertical'
  btn?: JSX.Element | string
  formItems?: IFormItem[]
  initialValues?: {}
  fetch?: (...arg: any[]) => Promise<any>
  afterCancel?: (visible: ModalGenerator['visible']) => void
  modal?: IModal
  content?: JSX.Element
}
@Component({})
export default class ModalGenerator extends Vue {

  readonly Props!: Props
  @Prop(Object) content!: JSX.Element
  @Prop(String) layout?: 'horizontal' | 'inline' | 'vertical'
  @Prop({ default: () => ({}) }) modal!: IModal
  @Prop(Array) formItems!: IFormItem[]
  @Prop(Object) initialValues?: {}
  @Prop([Object, String]) btn!: JSX.Element
  @Prop(Function) fetch!: (...arg: any[]) => Promise<any>
  @Prop(Function) afterCancel?: (visible: ModalGenerator['visible']) => void

  visible: boolean = false
  loading: boolean = false
  formRef: any;

  get IForm() {
    return (
      <IForm
        wrappedComponentRef={(form) => this.formRef = form}
        layout={this.layout}
        initialValues={this.initialValues}
        formItems={this.formItems} />
    )
  }

  get Footer() {
    const footerBtns = [
      <a-button
        key='back'
        onClick={this.cancel} >
        取消
      </a-button>,
      <a-button
        key='submit'
        type='primary'
        loading={this.loading}
        onClick={this.submit}>
        提交
    </a-button>
    ]
    const { footer } = this.modal
    Array.isArray(footer) && footerBtns.unshift(...footer)
    return footer === 'no' ? null : footerBtns
  }


  render() {
    const { visible, modal } = this
    const props = {
      visible,
      wrapClassName: 'scoped-modal',
      destroyOnClose: true,
      ...modal,
      footer: this.Footer,
    }
    return (
      <span>
        <span
          style='cursor: pointer'
          onClick={() => this.visible = true} >
          {this.btn}
        </span>
        <a-modal
          {...{ props }}
          onOk={this.submit}
          onCancel={this.cancel} >
          {this.content || this.IForm}
        </a-modal>
      </span>
    )
  }

  async submit() {
    if (this.formRef) {
      // 如果组件是表单组件 则先进行表单验证 否则 直接执行传入的方法
      const { form } = this.formRef
      form.validateFields((err: Error, params: {}) => {
        if (err) { return }
        // 合并传进表单的参数 与修改后的参数
        params = { ...this.initialValues, ...params }
        this.loading = true
        const promise = this.fetch(params, this.formRef)
        if (promise.then) {
          promise.then(() => {
            form.resetFields()
            this.cancel()
          })
        }
      })
    } else {
      this.fetch({ close: this.cancel })
    }
  }

  /**  关闭 弹窗model  */
  cancel() {
    this.afterCancel && this.afterCancel(this.visible)
    this.loading = false
    this.visible = false
  }
}
