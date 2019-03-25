import '../style.less'
import { Component, Vue } from 'vue-property-decorator'
import ModalGenerator from '@/components/Modal';
import ITable from '@/components/List/table';
import Button from '@/components/Button';
import ResourceStore from './store';
import { projectData } from '@/mock';
@Component({})
export default class List extends Vue {


  searchItems = [{
    label: '角色',
    field: 'zzzz',
  }, {
    label: 'role',
    field: 'cccccc',
  }]

  isNext = true

  get btnText() {
    return this.isNext ? '下一步' : '上一步'
  }

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
    }].map((r: any) => {
      r.labelCol = { span: 5 };
      r.wrapperCol = { span: 16 };
      return r
    })
  }

  render() {
    return (
      <a-col span={20}>
        <ITable
          data={projectData}
          customRow={this.customRow}
          columns={this.columns}
          searchItems={this.searchItems}
          actions={this.actions} />
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

  columns(_t: ITable) {
    return [{
      title: '角色',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.includes(value),
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
              modal={{
                title: '修改',
                afterClose: () => { this.isNext = true },
                footer: [
                  <a-button onClick={() => { this.isNext = !this.isNext }} >
                    {this.btnText}
                  </a-button>
                ],
              }}
              fetch={(params, _form) => {
                console.log(params);
                return this.Axios.get('')
              }}
              formProps={{
                formItems: this.editForm,
                initialValues: arg[1]
              }}
            />
            <a-divider type='vertical' />
            <a-icon type='delete' />
          </a>
        )
      }
    }]

  }

  actions(_t: ITable) {
    return [
      <ModalGenerator
        modal={{ title: '新建' }}
        formProps={{ formItems: this.searchItems }}
        btn={<Button type='primary' html='新建' />}
        fetch={(_params, _form) => {
          return this.Axios.get('')
        }}
      />
    ]
  }
}

