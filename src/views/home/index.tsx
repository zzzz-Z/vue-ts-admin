import { Component, Vue} from 'vue-property-decorator'
import List from '@/components/List'

@Component({})
export default class Home extends Vue {

  render() {
    console.log(this.$router);
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
    return (
      <div>
        <List
          url='/list.json'
          columns={columns}
          searchItems={searchItems}
          actions={[{
            click: (target: List) => { console.log(target) },
            config: {
              type: 'danger'
            },
            html: 'button',
          }]}
        />
      </div>
    )
  }
}
