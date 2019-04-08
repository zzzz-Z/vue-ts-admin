import { VC, Component } from '@/VC-vue';
import { BaseLayout, Title } from '@/components/Container';
import { ModalGenerator } from '@/components/Modal';
import { Md } from '@/components/Container/md';

@Component({})
export default class VcModal extends VC {

  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='  Form 表单弹窗'  >
          基于<b>Modal</b> 和<b>Form</b> 组件的HOC，常用于列表项的修改、新建。
        </Title>
        <ModalGenerator
          btn='创建弹窗'
          title='表单弹窗'
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          fetch={(({ params }) => {
            this.$info({ title: '表单值', content: JSON.stringify(params) })
            return new Promise((r) => r())
          })}
          formItems={[{
            wrapperCol: { offset: 5, span: 14 },
            el: <Title > 输入后点击确定取表单内容。 </Title>
          }, {
            field: 'name',
            label: '名称'
          }, {
            field: 'age',
            label: '年龄'
          }]}
        />
        <Md name='vc-modal' />
      </BaseLayout>
    )
  }
}
