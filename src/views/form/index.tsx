import { Component, Vue } from 'vue-property-decorator'
import { formDoc } from '@/docs/form';

@Component({})
export default class User extends Vue {

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
      <div>
        <a-table
          columns={columns}
          rowKey={(r, i) => i}
          size='middle'
          pagination={false}
          style='background:#fff;color:#314659'
          dataSource={formDoc}
        />
      </div>
    )
  }
}
