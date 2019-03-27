import { Component, Vue } from 'vue-property-decorator'
import { formDoc } from '@/docs/form';
import { BaseForm } from './form';
import { getMdStr } from '@/api/md';

@Component({})
export default class User extends Vue {
  code: any = ''

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

    getMdStr('baseForm').then((html) => this.code = html)

    return (
      <div style='background:#fff;padding:20px'>
        <h1 style='text-aglin:center' >基础表单</h1>
        <BaseForm />
        <div v-html={this.code} />
        <a-table
          columns={columns}
          rowKey={(r, i) => i}
          size='middle'
          pagination={false}
          dataSource={formDoc}
        />
      </div>
    )
  }
}
