```tsx
@Component({})
export default class BaseTable extends VC {

  typeRender(text) {
    return <span style='color:rgb(196, 29, 127)'> {text}</span>
  }

  render() {
    return (
    <ITable
      align='center'
      tooptip={35}
      dataSource={dataSource}
      columns={[{
        title: '参数',
        dataIndex: 'field'
      }, {
        title: '说明',
        dataIndex: 'description',
      }, {
        title: '类型',
        dataIndex: 'type',
        customRender: this.typeRender
      }, {
        title: '默认值',
        dataIndex: 'default',
      }]} />
    )
  }
}

const dataSource = [{
  field: 'algin',
  description: '对齐方式',
  type: 'left | right | center',
  default: 'left',
}, {
  field: 'tooptip',
  description: '隐藏超出( tooptip规定字数)文字，tooptip显示',
  type: 'number',
  default: '-',
}, {
  field: 'rowKey',
  description: '每一行的key,自动设置自增key,不再用手动设置',
  type: 'string| ()=>string|number',
  default: 'k=0 ; ()=> k++',
}, {
  field: '其他',
  description: '除上述字段外其他props',
  type: '同官方一致',
  default: '-',
}]

```