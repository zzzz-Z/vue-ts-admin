import { ITable } from '@/components/Table';
import { VC, Component } from '@/VC-vue';
import { createFormModal } from '@/components/Modal/createModal';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';

@Component({})
export default class BaseTable extends VC {

  typeRender(text) {
    return <span style='color:rgb(196, 29, 127)'> {text}</span>
  }

  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='基础列表'  >
          对antd官方Table进行hack,使通用属性传递更方便。
        </Title>
        <ITable
          pagination={false}
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
        <Md name='baseTable' />
      </BaseLayout>
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
