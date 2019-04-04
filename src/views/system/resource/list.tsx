import '../style.less'
import { VC } from '@/VC-vue';
import { Component } from 'vue-property-decorator'
import { ModalGenerator } from '@/components/Modal';
import ResourceStore from './store';
import { TableWithSearch } from '@/components/TableWithSearch';
import { getList } from '@/api/list';
@Component({})
export default class RList extends VC {

  isNext = true
  get btnText() { return this.isNext ? '下一步' : '提交' }
  get editForm() {
    const stepOne = this.isNext ? 'display:block' : 'display:none'
    const stepTwo = !this.isNext ? 'display:block' : 'display:none'
    return [{
      label: '角色',
      field: 'name',
      style: stepOne
    }, {
      label: 'role',
      field: 'role',
      style: stepOne
    }, {
      label: 'aa',
      field: 'aa',
      style: stepTwo
    }, {
      label: 'bb',
      field: 'bb',
      style: stepTwo
    }]
  }

  render() {
    return (
      <a-col span={20}>
        <TableWithSearch
          fetch={getList}
          tableProps={{tooptip: 10}}
          customRow={this.customRow}
          columns={this.columns}
          actions={this.actions}
          searchItems={[{ label: '角色', field: 'role', }, { label: '名称', field: 'name', }]}
        />
      </a-col>
    )
  }

  customRow(data) {
    return {
      on: {
        click: (e) => {
          e.path.forEach((r) => {
            if (r.nodeName === 'TR') {
              r.parentNode.childNodes.forEach((el) => {
                el.style.backgroundColor = 'transparent'
              })
              r.style.backgroundColor = '#d8e6df'
            }
          })
          ResourceStore.setCheckable(true)
          ResourceStore.saveCurrentRowInfo(data)
        }
      }
    }
  }

  columns(_t: TableWithSearch) {
    return [{
      title: '角色',
      dataIndex: 'name',
    }, {
      title: '权限',
      dataIndex: 'role',
    }, {
      title: '描述',
      dataIndex: 'address'
    }, {
      title: '操作',
      dataIndex: 'operation',
      customRender: (...arg: any) => {
        return (
          <a>
            <ModalGenerator
              btn={<a-icon type='edit' />}
              // okButtonProps={{ on: { click: () => { this.isNext = !this.isNext } } }}
              // okText={this.btnText}
              title='修改'
              // afterClose={() => { this.isNext = true }}
              fetch={({form}) =>  this.Axios.get('')}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              formItems={this.editForm}
              initialValues={arg[1]}
            />
            <a-divider type='vertical' />
            <a-icon type='delete' />
          </a>
        )
      }
    }]

  }

  actions() {
    return [
      <ModalGenerator
        title='新建'
        btn='新建'
        fetch={() => this.Axios.get('')}
        formItems={[{
          label: '角色',
          field: 'zzzz',
        }, {
          label: 'role',
          field: 'cccccc',
        }]}
      />
    ]
  }
}

