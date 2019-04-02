import IForm from '@/components/Form';
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IFormProps } from '@/types/form';
import { IModal } from '@/types/modal';
interface Props {
  formProps?: IFormProps
  btn?: JSX.Element | string
  fetch?: (...arg: any[]) => Promise<any>
  modal?: IModal
  tooltip?: string
  content?: JSX.Element
}

export const WrappedModal = ({ props }) => {

  @Component({})
  class WrappedModal extends Vue {

    visible: boolean = false
    loading: boolean = false
    formRef: any

    render() {

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
          ...props.modal,
          footer: props.footer(this)
        }
      }
      const formProps = {
        props: {
          wrappedComponentRef: (formRef: any) => this.formRef = formRef,
          formItems: [],
          ...props.formProps
        }
      }
      return (
        <span>
          <span
            style='cursor: pointer'
            onClick={() => this.visible = true} >
            <a-tooltip title={props.tooltip} >
              {props.btn}
            </a-tooltip>
          </span>
          <a-modal {...modalProps}>
            {props.content || <IForm  {...formProps} />}
          </a-modal>
        </span>
      )
    }

    async submit() {
      const { formRef: { form } } = this
      const { formProps, fetch } = props

      if (form) {
        // 如果组件是表单组件 则先进行表单验证 否则 直接执行传入的方法
        form.validateFields(async (err, params: {}) => {
          if (err) { return }
          try {
            /** 合并传进表单的初始值(若存在)与修改后的值 */
            params = { ...formProps.initialValues, ...params }
          } catch (e) { /** initialValues 不存在不作处理 */ }

          this.loading = true
          await fetch(params, form)
          form.resetFields()
          this.cancel()
        })
      } else {
        fetch(this.cancel)
      }
    }

    /**  关闭 弹窗model  */
    cancel() {
      this.loading = false
      this.visible = false
    }
  }

  return WrappedModal

}

