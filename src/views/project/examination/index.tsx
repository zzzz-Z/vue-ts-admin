import { Component, Vue } from 'vue-property-decorator'
import List from '@/components/List'
import Button from '@/components/Button';
import ModalGenerator from '@/components/Modal';
import Table from '@/components/List/table';

@Component({})
export default class Examination extends Vue {

  searchItems = [{
    label: '项目名',
    field: 'name',
  }, {
    label: 'id',
    field: 'id',
  }, {
    label: '状态',
    field: 'name3',
  }]
  created() {
    this.Axios.post('/system/role/list/1/', {
      pageCurrent: 1,
      searchParams: {},
      pageSize: 12
    })
  }
  render() {
    return (
      <List
        url='/list.json'
        columns={this.columns}
        searchItems={this.searchItems}
        actions={this.actions} />
    )
  }
  actions(t: Table) {
    return [
      <ModalGenerator
        modal={{ title: '新建' }}
        btn={<Button type='primary' html='新建' />}
        formItems={this.searchItems.map((r: any) => {
          r.labelCol = { span: 5 };
          r.wrapperCol = { span: 16 };
          return r
        })} />
    ]
  }

  columns(t: Table) {
    return [{
      title: '项目名',
      dataIndex: 'name'
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Home phone',
      dataIndex: 'tel',
    }, {
      title: 'Phone',
      dataIndex: 'phone',
    }, {
      title: '操作',
      dataIndex: 'operation',
      customRender: () => (
        <div>
          <ModalGenerator
            modal={{ width: 600 }}
            btn={<Button text='审批' />}
            formItems={[{
              label: ' 项目状态：',
              field: 'status',
              initialValue: 1,
              el: () => (
                <a-radio-group >
                  <a-radio value={1}>已完成</a-radio>
                  <a-radio value={2}>施工中</a-radio>
                  <a-radio value={3}>未完成</a-radio>
                </a-radio-group>
              )
            }]}
          />
          <ModalGenerator
            modal={{ title: '任务进程' }}
            btn={<Button text='进程' />}
            content={
              <a-steps
                direction='vertical'
                progressDot
                size='small'>
                <a-step title='创建项目' description='梵蒂.' />
                <a-step title='项目审批' description='张三丰.' />
                <a-step title='项目设计' description='任颖.' />
                <a-step title='项目施工' description='范冰.' />
                <a-step title='项目竣工' description='范冰.' />
              </a-steps>} />
        </div>
      )
    }]
  }
}
