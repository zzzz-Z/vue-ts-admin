```tsx
import { Component } from 'vue-property-decorator'
import { Title } from '@/components/Container';
import { VC } from '@/VC-vue';
import { ModalGenerator } from '@/components/Modal';

@Component({})
export default class VcModal extends VC {

  render() {
    return (
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
          wrapperCol: { offset: 5 , span: 14},
          el: <Title > 输入后点击确定取表单内容。 </Title>
        }, {
          field: 'name',
          label: '名称'
        }, {
          field: 'age',
          label: '年龄'
        }]}
      />
    )
  }
}
```