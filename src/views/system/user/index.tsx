import { Component, Vue } from 'vue-property-decorator'
import List from '@/components/List'
import ModalGenerator from '@/components/Modal';
import Table from '@/components/List/';
import Breadcrumb from '@/components/Breadcrumb';

@Component({})
export default class User extends Vue {

  render() {
    const columns = (t: Table) => [{
      title: '项目名称',
      dataIndex: 'name'
    }, {
      title: '属性01',
      dataIndex: 'tel',
    }, {
      title: '属性02',
      dataIndex: 'phone',
    }, {
      title: '状态',
      dataIndex: 'address',
    }]

    const searchItems = [{
      label: '用户名',
      field: 'name',
      initialValue: 'admin',
    }, {
      label: 'id',
      field: 'id',
      initialValue: 123456,
    }, {
      label: '其他',
      field: 'name3',
      initialValue: '111',
    }]
    const actions = (t: Table) => [
      <ModalGenerator
        modal={{ title: '新建' }}
        btn={<a-button type='primary' v-text='新建' />}
        formProps={{
          formItems: searchItems.map((r: any) => {
            r.labelCol = { span: 5 };
            r.wrapperCol = { span: 16 };
            return r
          })
        }} />
    ]
    return (
      <div>
        <Breadcrumb />
        <List
          data={[]}
          columns={columns}
          searchItems={searchItems}
          actions={actions}
        />
      </div>
    )
  }
}
