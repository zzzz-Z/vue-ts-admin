import IForm from '../Form'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IFormProps } from '@/types/form';
interface Props {
  formProps?: IFormProps
  btn?: JSX.Element | string
  fetch?: (...arg: any[]) => Promise<any>
  modal?: IModal
  tooltip?: string
  content?: JSX.Element
}
@Component({})
export default class ModalGenerator extends Vue {

  readonly Props!: Props
  @Prop() content!: JSX.Element
  @Prop() tooltip?: string
  @Prop({ default: () => ({}) }) modal!: IModal
  @Prop() formProps?: IFormProps
  @Prop([Object, String]) btn!: JSX.Element
  @Prop(Function) fetch!: (...arg: any[]) => Promise<any>

  visible: boolean = false
  loading: boolean = false
  formRef: any

  // get Footer() {
  //   const { footer, okText, cancelText, okButtonProps, cancelButtonProps } = this.modal
  //   const okClcik = (okButtonProps || {on: {}}).on.click
  //   const cancalClcik = (cancelButtonProps || {on: {}}).on.click
  //   const footerBtns = [
  //     <a-button
  //       {...cancelButtonProps} >
  //       {cancelText || '取消'}
  //     </a-button>,
  //     <a-button
  //       type='primary'
  //       loading={this.loading}
  //       {...okButtonProps}>
  //       {okText || '提交'}
  //     </a-button>
  //   ]
  //   Array.isArray(footer) && footerBtns.unshift(...footer)
  //   return footer === 'no' ? null : footerBtns
  // }

  render() {
    // const {okButtonProps, cancelButtonProps, ...rest} = this.modal
    // console.log(rest);
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
        // footer: this.Footer,
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
