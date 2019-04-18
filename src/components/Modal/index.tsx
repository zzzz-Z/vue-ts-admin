import IForm from '@/components/Form';
import { Component } from 'vue-property-decorator'
import { IFormProps } from '@/types/form';
import { VC } from '@/VC-vue';
import { FormUtils } from '@/types/form-ref';

interface Params {
  params?: {}
  form?: FormUtils
  close?(): void
}
interface Props {
  btn?: JSX.Element | string
  fetch?: (v: Params) => Promise<any>
  tooltip?: string
  content?: JSX.Element
}

export type ModalGeneratorProps = Props & IModal & IFormProps

export const ModalGenerator = ({ data, props }: FC<ModalGeneratorProps>) => {

  @Component({})
  class ModalGenerator extends VC {

    visible: boolean = false
    loading: boolean = false
    form!: FormUtils

    render() {
      const { tooltip, btn, content, footer } = props!

      const modalProps = {
        props: {
          ...props,
          visible: this.visible,
          confirmLoading: this.loading,
          wrapClassName: 'scoped-modal',
          destroyOnClose: true,
          footer: typeof footer === 'function' ? footer(this) : footer,
        },
        on: { cancel: this.cancel, ok: this.submit }
      }

      return (
        <span>
          <span
            vIf={btn}
            style='cursor: pointer'
            onClick={this.open} >
            <a-tooltip title={tooltip} >
              {typeof btn === 'string' ? <a-button type='primary' v-html={btn} /> : btn}
            </a-tooltip>
          </span>
          <a-modal  {...modalProps}>
            {content || <IForm  {...{ props }} ref='form' wrappedComponentRef={this.save} />}
          </a-modal>
        </span>
      )
    }

    submit() {
      const { form } = this
      const { initialValues, fetch } = props!
      if (!form) { fetch!({ close: this.cancel }) }
      if (form) {
        form.validateFields((e, params) => {
          if (!e) {
            // 合并传进表单的初始值(若存在)与修改后的值
            params = { ...initialValues || {}, ...params }
            this.loading = true
            fetch!({ params, form })
              .then(() => { form.resetFields(); this.cancel() })
              .finally(() => this.loading = false)
          }
        })
      }
    }

    /** 保存form */
    save(formRef) {
      if (formRef) {
        this.form = formRef.form
      }
    }

    /** 打开弹窗 */
    open() {
      this.visible = true
    }

    /**  关闭 弹窗model  */
    cancel() {
      this.loading = false
      this.visible = false
    }
  }

  return <ModalGenerator {...data} />
}
