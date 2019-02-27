import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import IForm from '../Form'
import IButton from '../Button';
import { FormItem } from '../Form/type';
import ButtonProps from '../Button/type';
import Ellipsis from '../Ellipsis';
import { Card, Table, Button } from 'ant-design-vue';
import Breadcrumb from '../Breadcrumb';
import './index.less'

interface ActionsType extends ButtonProps {
  click: (t: any) => any
}
interface Props {
  columns: (t) => any[]
  url: string
  searchItems?: FormItem[]
  actions?: ActionsType[]
  bodyStyle?: object
}

@Component({
  // 大写开头的组件名 ts 会检查Props 的类型 不能使用解构的方式去传递props
  components: {
    IButton,
    ACard: Card,
    ATable: Table,
    AButton: Button
  }
})
export default class List extends Vue {

  readonly Props!: Props
  @Prop() columns
  @Prop() url
  @Prop({ default: () => ([]) }) searchItems?: any[]
  @Prop({ default: () => ([]) }) actions?: ActionsType[]
  @Prop() bodyStyle

  @Provide() baseUrl = '/'
  @Provide() isUp = false
  @Provide() dataSource = []
  @Provide() totalSize = 0
  @Provide() loading = false
  @Provide() pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 15
  }
  @Provide() rowSelection = {}
  @Provide() baseParams = {
    pageSize: 12,
    pageCurrent: 1,
    searchParams: {}
  }
  created() {
    this.getDataSouce()
  }
  RESET() {
    this.dataSource = []
    this.totalSize = 0
    this.baseParams = {
      pageSize: 12,
      pageCurrent: 1,
      searchParams: {}
    }
  }

  query(queryParams: any) {
    console.log(1);
  }

  reload(queryParams: any) {
    console.log(1);
  }
  toggleForm() {
    this.isUp = !this.isUp
  }

  getDataSouce() {
    this.Axios.get(this.url, { params: this.baseParams })
      .then((r: any) => this.dataSource = r.data)
  }
  get _columns() {
    return this.columns(this).map((r) => {
      if (!r.customRender) {
        r.customRender = (text) => (
          typeof text === 'string' ? <Ellipsis length={7} str={text} /> : text
        )
      }
      return r
    })
  }
  get renderSearch() {
    const items = this.searchItems
    if (!items) { return }
    const searchItems: any[] = this.isUp ? [...items] : [items[0], items[1]]
    const handle = {
      el: (form: any) => (
        <div style='margin-left:30px' >
          <a-button
            style='margin-right:10px'
            type='primary'
            icon='search'
            onClick={() => this.query(form.getFieldsValue())} />
          <a-button
            style='margin-right:10px'
            type='primary'
            icon='reload'
            onClick={() => this.reload(form.getFieldsValue())} />
          <a
            v-show={items.length > 2}
            onClick={this.toggleForm} >
            {
              this.isUp ?
                <span>收起<a-icon type='up' /></span> :
                <span>展开<a-icon type='down' /></span>
            }
          </a>
        </div>
      )
    }
    return (
      <IForm
        iStyle='padding:0 0 10px;'
        layout='inline'
        class='header-search'
        col={{
          lg: 5,
          md: 24
        }}
        formItems={[...searchItems, handle]} />
    )

  }
  renderHeader() {
    const bodyStyle = {
      padding: '0 0 15px',
      borderRadius: 0,
      minHeight: '70px',
      border: 0,
      ...this.bodyStyle,
    }
    return (
      <a-card
        bodyStyle={bodyStyle}
        bordered={false} >
        {this.renderSearch}
        <div>
          {(this.actions as any).map((props) =>
            <i-button nativeOnClick={() => props.click(this)} {...{ props }} />
          )}
        </div>
      </a-card >
    )
  }

  render() {
    return (
      <div >
        <Breadcrumb />
        <div style='background:#fff;padding:25px'>
          {this.renderHeader()}
          <a-table
            pagination={this.pagination}
            dataSource={this.dataSource}
            loading={this.loading}
            rowSelection={this.rowSelection}
            columns={this._columns}>
          </a-table>
        </div>
      </div>
    )
  }
}
