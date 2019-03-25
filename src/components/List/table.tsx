import { Component, Vue, Prop } from 'vue-property-decorator'
import IForm from '../Form'
import Ellipsis from '../Ellipsis';
import { ITableProps, ITableData, Column } from './type';
import { FormRef } from '../Form/type';
import './style.less'


@Component({})
export default class ITable extends Vue {

  readonly Props!: ITableProps
  @Prop() columns!: (t: ITable) => Column[]
  @Prop() data!: Promise<ITableData>
  @Prop() query?: (params: {}) => Promise<[]>
  @Prop() algin?: 'left' | 'right' | 'center'
  @Prop() customRow?: () => ({})
  @Prop({ default: () => ([]) }) searchItems?: any[]
  @Prop({ default: () => ([]) }) actions?: (t: ITable) => JSX.Element[]
  @Prop() bodyStyle?: {}

  isUp = false
  totalSize = 0
  loading = false
  pagination = {
    showTotal: (n) => '共' + n + '条',
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10
  }
  rowSelection = {}
  dataSource: any;

  created() {
    this.init()
  }

  init() {
    this.loading = true;
    setTimeout(() => {
      this.data
        .then((res: ITableData) => {
          this.dataSource = res.dataSource
        })
        .catch((e) => this.$message.error('获取数据失败'))
        .finally(() => this.loading = false)
    }, 1000);

  }

  /** 按条件查询 */
  _query(form: FormRef) {
    const params = form.getFieldsValue()
    this.query && this.query(params).then((v) => {
      this.dataSource = v
    })
  }
  /** 重置列表数据 & 搜索条件 */
  reload(form: FormRef) {
    form.resetFields()
    this.init()
  }
  /** 切换查询项展开收起 */
  toggleForm() {
    this.isUp = !this.isUp
  }

  get _columns() {
    return this.columns(this).map((r) => {
      if (this.algin) {
        r.align = this.algin
      }
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
      el: (form: FormRef) => (
        <div style='margin-left:30px' >
          <a-button
            style='margin-right:10px'
            type='primary'
            icon='search'
            onClick={() => this._query(form)} />
          <a-button
            style='margin-right:10px'
            type='primary'
            icon='reload'
            onClick={() => this.reload(form)} />
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
