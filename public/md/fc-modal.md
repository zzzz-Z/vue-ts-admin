```tsx
import { Component } from 'vue-property-decorator'
import { Title, BaseLayout, CodeWrapper } from '@/components/Container';
import { VC } from '@/VC-vue';
import { createFormModal } from '@/components/Modal/createModal';

@Component({})
export default class FcModal extends VC {

  initModal() {
    const options = {
      title: '创建弹窗',
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      fetch: (v) => {
        this.$info({ title: '表单值', content: JSON.stringify(v.params) })
        return new Promise((r) => r())
      },
      formItems: [{
        wrapperCol: { offset: 5, span: 14 },
        el: <Title > 输入后点击确定取表单内容。 </Title>
      }, {
        field: 'name',
        label: '名称'
      }, {
        field: 'age',
        label: '年龄'
      }]
    }
    // this.$createFormModal(options)
    createFormModal(options)
  }

  render() {
    return (
      <a-button onClick={this.initModal} vHtml='创建弹窗'  />
    )
  }
}
```