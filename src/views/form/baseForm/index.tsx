import { VC, Component } from '@/VC-vue';
import { BaseForm } from './form';
import { ITable } from '@/components/Table';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';

@Component({})
export default class IBaseForm extends VC {
  render(h) {
    return (
      <BaseLayout breadcrumb>
        <Title title='基础表单' />
        <BaseForm />
        <div style='margin:10px auto;width:90%;'>
          <Md name='baseForm' />
          <ITable
            columns={columns.call(this, h)}
            size='middle'
            pagination={false}
            dataSource={formDoc} />
        </div>
      </BaseLayout>
    );
  }
}

function columns(this: IBaseForm, h) {
  return [{
    title: '参数',
    dataIndex: 'field'
  }, {
    title: '说明',
    dataIndex: 'description',
  }, {
    title: '类型',
    dataIndex: 'type',
    customRender: (r) => <span style='color:#c41d7f'>{r}</span>
  }, {
    title: '默认值',
    dataIndex: 'default',
  }];
}

const formDoc = [{
  field: 'layout',
  description: '表单布局',
  type: 'horizontal | inline | vertical',
  default: 'horizontal',
}, {
  field: 'formItems',
  description: 'Form.Item 配置项',
  type: 'IFormItem[]',
  default: '-',
}, {
  field: 'initialValues',
  description: '表单初始值数据',
  type: '{ }',
  default: '-',
}, {
  field: 'labelCol',
  description: '统一设置 Form.Item 的 labelCol,会被 Form.Item 中同字段覆盖',
  type: 'Col',
  default: '-',
}, {
  field: 'wrapperCol',
  description: '统一设置 Form.Item 的 wrapperCol,会被 Form.Item 中同字段覆盖',
  type: 'Col',
  default: '-',
}, {
  field: 'itemStyle',
  description: '设置每一个Form.Item的布局',
  type: 'Col',
  default: '-',
}];
