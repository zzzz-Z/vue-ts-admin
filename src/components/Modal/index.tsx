import IForm from '@/components/Form';
import { Component, Prop } from 'vue-property-decorator'
import { IFormProps } from '@/types/form';
import VC from '@/VC-vue';
import { IModal } from '@/types/modal';
interface Props {
  formProps?: IFormProps
  btn?: JSX.Element | string
  fetch?: (...arg: any[]) => Promise<any>
  modal?: IModal
  tooltip?: string
  content?: JSX.Element
}
@Component({})
export default class ModalGenerator extends VC<Props> {

  @Prop() content!: JSX.Element
  @Prop() tooltip?: string
  @Prop({ default: () => ({}) }) modal!: IModal
  @Prop() formProps?: IFormProps
  @Prop([Object, String]) btn!: JSX.Element
  @Prop(Function) fetch!: (...arg: any[]) => Promise<any>

  visible: boolean = false
  loading: boolean = false
  formRef: any

  render() {
    const footer = this.modal.footer
    const modalProps = {
      on: {
        cancel: this.cancel,
        ok: this.submit
      },
      props: {
        visible: this.visible,
        confirmLoading: this.loading,
        wrapClassName: 'scoped-modal',
        destroyOnClose: true,
        ... this.modal,
        footer: typeof footer === 'function' ? footer(this) : footer,
      }
    }
    const formProps = {
      props: {
        wrappedComponentRef: (formRef: any) => this.formRef = formRef,
        ...this.formProps
      }
    }
    return (
      <span>
        <span
          style='cursor: pointer'
          onClick={() => this.visible = true} >
          <a-tooltip title={this.tooltip} >
            {this.btn}
          </a-tooltip>
        </span>
        <a-modal {...modalProps}>
          {this.content || <IForm  {...formProps} />}
        </a-modal>
      </span>
    )
  }

  async submit() {
    const { formRef: { form }, formProps } = this

    if (form) {
      // 如果组件是表单组件 则先进行表单验证 否则 直接执行传入的方法
      form.validateFields((err, params: {}) => {
        if (err) { return }
        try {
          // 合并传进表单的初始值(若存在)与修改后的值
          params = { ...(formProps as any).initialValues, ...params }
        } catch (error) {
          // initialValues 不存在不作处理
        }
        this.loading = true
        const promise = this.fetch(params, form)
        if (promise.then) {
          promise.then(() => {
            form.resetFields()
            this.cancel()
          })
        }
      })
    } else {
      this.fetch(this.cancel)
    }
  }

  /**  关闭 弹窗model  */
  cancel() {
    this.loading = false
    this.visible = false
  }
}
