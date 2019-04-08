import { VC, Component } from '@/VC-vue';
import { formDoc } from '@/docs/form';
import { BaseForm } from './form';
import { ITable } from '@/components/Table';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';

@Component({})
export default class IBaseForm extends VC {

  render() {
    const columns = [{
      title: '参数',
      dataIndex: 'field'
    }, {
      title: '说明',
      dataIndex: 'description',
    }, {
      title: '类型',
      dataIndex: 'type',
      customRender: (r) => {
        switch (r) {
          case 'Col':
            return <a target='blank' href='https://ant-design-vue.gitee.io/components/grid-cn/#Col' >{r}</a>
          default:
            return <span style='color:#c41d7f'>{r}</span>
        }
      }
    }, {
      title: '默认值',
      dataIndex: 'default',
    }]

    return (
      <BaseLayout breadcrumb>
        <Title title='基础表单' />
        <BaseForm />
        <div style='margin:10px auto;width:90%;'>
          <Md name='baseForm' />
          <ITable
            columns={columns}
            size='middle'
            pagination={false}
            dataSource={formDoc}
          />
        </div>
      </BaseLayout>
    )
  }
}
