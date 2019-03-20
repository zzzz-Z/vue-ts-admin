import { Component, Vue } from 'vue-property-decorator'
import List from '@/components/List'
import Button from '@/components/Button';
import ModalGenerator from '@/components/Modal';
import Table from '@/components/List/table';

@Component({})
export default class User extends Vue {

  created() {
    this.Axios.post('/system/role/list/1/', {
      pageCurrent: 1,
      searchParams: {},
      pageSize: 12
    })
  }
  render() {
    const columns = (t: Table) => [{
      title: 'Name',
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
      title: 'Address',
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
        btn={<Button type='primary' html='新建' />}
        formItems={searchItems.map((r: any) => {
          r.labelCol = { span: 5 };
          r.wrapperCol = { span: 16 };
          return r
        })}/>
    ]
    return (
      <div>
        <List
          url='/list.json'
          columns={columns}
          searchItems={searchItems}
          actions={actions}
        />
      </div>
    )
  }
}
