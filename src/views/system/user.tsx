import { Component, Vue } from 'vue-property-decorator'
import List from '@/components/List'
import Button from '@/components/Button';
import ModalGenerator from '@/components/Modal';

@Component({})
export default class User extends Vue {

  render() {
    const columns = (t) => [{
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
      label: 'age',
      field: 'name',
      initialValue: 1,
    }, {
      label: 'age',
      field: 'name',
      initialValue: 1,
    }, {
      label: 'age',
      field: 'name',
      initialValue: 1,
    }, {
      label: 'age',
      field: 'name',
      initialValue: 1,
    }, {
      label: 'age',
      field: 'name',
      initialValue: 1,
    }, {
      label: 'name1',
      field: 'name2',
      initialValue: '111',
    }, {
      label: '搜索条件一',
      field: 'name3',
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      initialValue: '111',
    }]
    const form = searchItems.map((r: any) => {
      r.labelCol = { span: 6 }
      r.wrapperCol = { span: 14 }
      r.style = 'width:100%'
      return r
    })
    return (
      <div>
        <List
          url='/list.json'
          columns={columns}
          searchItems={searchItems}
          actions={(t) => {
            return [
              // <ModalGenerator
              //   layout='inline'
              //   btn={<Button type='primary' html='new' />}
              //   formItems={form}
              //   modal={{ title: '新建' }}
              // />
            ]
          }}
        />
      </div>
    )
  }
}
