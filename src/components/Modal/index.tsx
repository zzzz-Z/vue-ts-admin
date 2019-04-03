import IForm from '@/components/Form';
import { Component } from 'vue-property-decorator'
import { IFormProps } from '@/types/form';
import { VC } from '@/VC-vue';
import { IModal } from '@/types/modal';
interface Props {
  formProps?: IFormProps
  btn?: JSX.Element | string
  fetch?: (...arg: any[]) => Promise<any>
  modal?: IModal
  tooltip?: string
  content?: JSX.Element
}
const props = ['formProps', 'btn', 'fetch', 'modal', 'tooltip', 'content']
@Component({ props })
export default class ModalGenerator extends VC<Props> {

  visible: boolean = false
  loading: boolean = false
  formRef: any

  render() {
    const { modal, formProps, tooltip, btn, content } = this.$props
    const footer = modal!.footer
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
        ...modal,
        footer: typeof footer === 'function' ? footer(this) : footer,
      }
    }
    const _formProps = {
      props: {
        wrappedComponentRef: (formRef: any) => this.formRef = formRef,
        ...formProps
      }
    }
    return (
      <span>
        <span
          style='cursor: pointer'
          onClick={() => this.visible = true} >
          <a-tooltip title={tooltip} >
            {typeof btn === 'string' ? <a-button type='primary' v-html={btn} /> : btn}
          </a-tooltip>
        </span>
        <a-modal {...modalProps}>
          {content || <IForm  {..._formProps} />}
        </a-modal>
      </span>
    )
  }

  async submit() {
    const { formRef: { form } } = this
    const { formProps, fetch } = this.$props

    if (form) {
      // 如果组件是表单组件 则先进行表单验证 否则 直接执行传入的方法
      form.validateFields((err, params: {}) => {
        if (err) { return }
        try {
          // 合并传进表单的初始值(若存在)与修改后的值
          params = { ...formProps!.initialValues, ...params }
        } catch (error) {
          // initialValues 不存在不作处理
        }
        this.loading = true
        const promise = fetch!(params, form)
        if (promise.then) {
          promise.then(() => {
            form.resetFields()
            this.cancel()
          })
        }
      })
    } else {
      fetch!(this.cancel)
    }
  }

  /**  关闭 弹窗model  */
  cancel() {
    this.loading = false
    this.visible = false
  }
}
