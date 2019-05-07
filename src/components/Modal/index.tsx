import IForm from '@/components/Form';
import { VC, Component } from '@/VC-vue';
import { FormUtils } from '@/types/form-ref';
import { IFormProps } from '@/types/form';


interface Params {
  params?: {};
  form?: FormUtils;
  cancel?(): void;
}
interface Props {
  btn?: JSX.Element | string;
  fetch?: (v: Params) => Promise<any>;
  tooltip?: string;
  content?: JSX.Element;
}

export type ModalGeneratorProps = Props & IFormProps & IModal;

export const ModalGenerator = ({ data, props = {} }: FC<ModalGeneratorProps>) => {

  @Component({})
  class ModalGenerator extends VC {

    visible: boolean = false;
    loading: boolean = false;
    form!: FormUtils;

    render() {
      const { tooltip, btn, content, footer } = props;

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
      };

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
            {content || <IForm  {...{ props }} wrappedComponentRef={this.save} />}
          </a-modal>
        </span>
      );
    }

    submit() {
      const { form, cancel } = this;
      const { initialValues, fetch } = props;
      !form ? fetch!({ cancel }) : form.validateFields((err, params) => {
        if (!err) {
          // 合并传进表单的初始值(若存在)与修改后的值
          params = { ...initialValues || {}, ...params };
          this.loading = true;
          fetch!({ params, form })
            .finally(() => this.loading = false)
            .then(() => {
              form.resetFields();
              cancel();
            });
        }
      });
    }

    /** 保存form */
    save(formRef) {
      this.form = formRef ? formRef.form : null;
    }

    /** 打开弹窗 */
    open() {
      this.visible = true;
    }

    /**  关闭 弹窗model  */
    cancel() {
      this.loading = false;
      this.visible = false;
    }
  }

  return <ModalGenerator {...data} />;
};
