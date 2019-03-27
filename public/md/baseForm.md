```tsx
import IForm from '@/components/Form';

export const BaseForm = () => {
  return (
    <IForm
    labelCol={{span: 5}}
    wrapperCol={{span: 16}}
    formItems={[{
      field: 'title',
      label: '标题'
    }, {
      field: 'time',
      label: '起止时间',
      el: (form) => <a-date-picker/>
    }, {
      field: 'doc',
      label: '目标描述',
      el: () => <a-textarea placeholder='Basic usage' rows={4}/>
    }, {
      field: 'norm',
      label: '衡量标准',
      el: () => <a-textarea placeholder='请输入衡量标准' rows={4}/>
    }]} />
  )
}

```
