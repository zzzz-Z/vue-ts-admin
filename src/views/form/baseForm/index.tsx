import { Component, Vue } from 'vue-property-decorator'
import { formDoc } from '@/docs/form';
import { BaseForm } from './form';
import { BaseLayout, Title, CodeWrapper } from '@/components/Container';

@Component({})
export default class IBaseForm extends Vue {

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
        <Title >
          基础表单
         </Title>
        <BaseForm />
        <div style='margin:10px auto;width:90%;'>
          <CodeWrapper name='baseForm' hid />
          <a-table
            header='文档说明'
            columns={columns}
            rowKey={(r, i) => i}
            size='middle'
            pagination={false}
            dataSource={formDoc}
          />
        </div>
      </BaseLayout>
    )
  }
}
