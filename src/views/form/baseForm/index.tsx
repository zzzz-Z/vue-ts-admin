import { Component, Vue } from 'vue-property-decorator'
import { formDoc } from '@/docs/form';
import { BaseForm } from './form';
import { getMdStr } from '@/api/md';
import { CodeContent } from '@/components/BaseContent';

@Component({})
export default class IBaseForm extends Vue {
  codeHtml: any = ''

  created() {
    getMdStr('baseForm').then((html) => this.codeHtml = html)
    console.log('cccc');
  }

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
      <div style='background:#fff;padding:20px'>
        <h1 style='text-aglin:center' >基础表单</h1>
        <BaseForm />
        <div style='margin:10px auto;width:80vw;'>
          <CodeContent html={this.codeHtml} />
          <a-table
            header='文档说明'
            columns={columns}
            rowKey={(r, i) => i}
            size='middle'
            pagination={false}
            dataSource={formDoc}
          />
        </div>
      </div>
    )
  }
}
