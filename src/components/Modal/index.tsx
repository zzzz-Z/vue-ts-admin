import Form from '../Form'
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import { Modal } from 'ant-design-vue';
import { FormItem } from '../Form/type';

interface Props {
  layout?: 'horizontal' | 'inline' | 'vertical'
  btn?: JSX.Element | string
  formItems?: FormItem[]
  fetch?: (params: object) => Promise<any>
  modal?: Modal
}


@Component({})
export default class ModalGenerator extends Vue {

  readonly Props!: Props
  @Prop(Object) content!: JSX.Element
  @Prop(String) layout
  @Prop({ default: () => ({}) }) modal!: Modal
  @Prop(Array) formItems!: FormItem[]
  @Prop([Object, String]) btn!: JSX.Element | string
  @Prop(Function) fetch!: (params: object) => Promise<any>
  @Provide() visible: boolean = false
  @Provide() loading: boolean = false
  /* 表单实例 */
  get formRef(): any {
    return this.$refs.form
  }

  async submit() {
    if (this.formRef) {
      // 如果组件是表单组件 则先进行表单验证 否则 直接执行传入的方法
      const { form, initialValues } = this.formRef
      form.validateFields((err: Error, params: object) => {
        if (err) { return }
        // 合并传进表单的参数 与修改后的参数
        params = { ...initialValues, ...params }
        this.loading = true
        const promise = this.fetch({ params, formRef: this.formRef })
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
  /**
   * 关闭 弹窗model
   */
  cancel() {
    this.loading = false
    this.visible = false
  }
  render() {
    const { visible, cancel, modal } = this
    const modalProps = {
      visible,
      cancel,
      footer: undefined,
      destroyOnClose: true,
      ...modal,
    }
    return (
      <span>
        <span
          style='cursor: pointer;font-weight:bolde;rmargin-right:10px'
          onClick={() => this.visible = true} >
          {this.btn}
        </span>
        <a-modal {...{ props: modalProps }} onCancel={modalProps.cancel} >
          {
            this.content ||
            <Form
              ref='form'
              layout={this.layout}
              formItems={this.formItems} />
          }
          <div slot='footer' >
            <a-button key='back' onClick={this.cancel} >
              取消
            </a-button>
            <a-button
              key='submit'
              type='primary'
              loading={this.loading}
              onClick={this.submit}>
              提交
            </a-button>
          </div>
        </a-modal>
      </span>
    )
  }
}
