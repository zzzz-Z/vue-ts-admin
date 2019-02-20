import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import IForm from '../Form'
import IButton from '../Button';
import { FormItem } from '../Form/type';
import ButtonProps from '../Button/type';
import Ellipsis from '../Ellipsis';
import { Card, Table, Button } from 'ant-design-vue';


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
    IButton ,
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
  @Provide() pagination = {}
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
        <div style='width:150px'>
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
          <a onClick={this.toggleForm} >{this.isUp ? '收起' : '展开'}</a>
        </div>
      )
    }
    return (
      <IForm
        style='float:right'
        layout='inline'
        formItems={[...searchItems, handle]} />
    )
  }
  renderHeader() {
    const bodyStyle = {
      padding: '32px 24px 16px',
      borderRadius: 0,
      border: 0,
      ...this.bodyStyle,
    }
    return (
      <a-card
        bodyStyle={bodyStyle}
        bordered={false} >
        <div style='float:left;line-height:39.9px'>
          {
            (this.actions as any).map((props) =>
              <i-button nativeOnClick={() => {
                console.log(111);
              }} {...{ props }} />
            )}
        </div>
        {this.renderSearch}
      </a-card>
    )
  }

  render() {
    return (
      <div style='background:#fff'>
        {this.renderHeader()}
        <a-table
          style='background:#fff'
          pagination={this.pagination}
          dataSource={this.dataSource}
          loading={this.loading}
          rowSelection={this.rowSelection}
          columns={this._columns}>
        </a-table>
      </div>
    )
  }
}
