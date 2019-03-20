import { Component, Vue, Prop } from 'vue-property-decorator'
import IForm from '../Form'
import Ellipsis from '../Ellipsis';
import './style.less'


export interface Props {
  columns: (t: Table) => any[]
  url: string
  searchItems?: IFormItem[]
  actions?: (t: Table) => JSX.Element[]
  customRow?: (...arg: any) => ({})
  bodyStyle?: object
}

@Component({})
export default class Table extends Vue {

  readonly Props!: Props
  @Prop() columns
  @Prop() url
  @Prop() customRow?: () => ({})
  @Prop({ default: () => ([]) }) searchItems?: any[]
  @Prop({ default: () => ([]) }) actions?: (t: Table) => JSX.Element[]
  @Prop() bodyStyle

  baseUrl = '/'
  isUp = false
  dataSource = []
  totalSize = 0
  loading = false
  pagination = {
    showTotal: (n) => {
      return n + '条'
    },
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10
  }
  rowSelection = {}
  baseParams = {
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
    this.loading = true
    this.Axios.get(this.url, { params: this.baseParams })
      .then((r: any) => {
        this.dataSource = r.data
        this.loading = false
      })
  }
  get _columns() {
    return this.columns(this).map((r) => {
      // r.align='center'
      if (!r.customRender) {
        r.customRender = (text) => (
          typeof text === 'string' ? <Ellipsis length={15} str={text} /> : text
        )
      }
      return r
    })
  }
  get renderSearch() {
    const items = this.searchItems
    if (!items) { return }
    items.map((r: any) => r.style = 'margin-right:20px')
    const searchItems: any[] = this.isUp ? items : [items[0], items[1]]
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
            {this.isUp ? <span>收起<a-icon type='up' /></span> : <span>展开<a-icon type='down' /></span>}
          </a>
        </div>
      )
    }
    return (
      <IForm
        layout='inline'
        id='header-search'
        col={{ lg: 5, md: 24 }}
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
        {this.actions && <div>{this.actions(this)}</div>}
      </a-card >
    )
  }

  render() {
    return (
      <div style='background:#fff;padding:25px;'>
        {this.renderHeader()}
        <a-table
          customRow={this.customRow}
          pagination={this.pagination}
          dataSource={this.dataSource}
          loading={this.loading}
          rowSelection={this.rowSelection}
          columns={this._columns} />
      </div>
    )
  }
}
