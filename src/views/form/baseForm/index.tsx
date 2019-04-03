import { Component } from 'vue-property-decorator'
import { formDoc } from '@/docs/form';
import { BaseForm } from './form';
import { BaseLayout, Title, CodeWrapper } from '@/components/Container';
import { VC } from '@/VC-vue';
import { ITable } from '@/components/Table';

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
        <Title description='基础表单' >
          基础表单
         </Title>
        <BaseForm />
        <div style='margin:10px auto;width:90%;'>
          <CodeWrapper name='baseForm' hid />
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
