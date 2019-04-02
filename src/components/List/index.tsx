import './style.less'
import { Component, Vue, Prop } from 'vue-property-decorator'
import IForm from '@/components/Form';
import { Column } from '@/types/column';
import { FormRef } from '@/types/form-ref';
import { IFormItem } from '@/types/form-item';
import { Table } from '@/types/table';
import { ITable } from './table';
import VC from '@/VC-vue';

export interface ITableData {
  dataSource: Array<{}>
  totalSize?: number
  totalPageCount?: number
}

export interface ITableProps {
  columns: (t: List) => Column[]
  data: Promise<ITableData> | Array<{}>
  algin?: string
  searchItems?: IFormItem[]
  actions?: (t: List) => JSX.Element[]
  customRow?: (...arg: any) => ({})
  tableProps?: Table
  /** 是否含有面包屑 */
  breadcrumb?: boolean
}


@Component({})
export default class List extends VC<ITableProps> {

  @Prop() columns!: ((t: List) => Column[]) | Column[]
  @Prop() data!: Promise<ITableData> | Array<{}>
  @Prop() query?: (params: {}) => Promise<[]>
  @Prop() customRow?: () => ({})
  @Prop() searchItems?: any[]
  @Prop() actions?: (t: List) => JSX.Element[]
  @Prop() tableProps?: Table
  @Prop({ default: true }) breadcrumb?: boolean

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
  dataSource: any[] = []

  created() {
    this.init()
  }

  init() {
    this.loading = true;
    try {
      (this.data as Promise<ITableData>)
        .catch((e) => this.$message.error('获取数据失败'))
        .finally(() => this.loading = false)
        .then((res: ITableData) => {
          this.dataSource = res.dataSource
        })
    } catch (error) {
      this.dataSource = this.data as []
      this.loading = false
    }
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

  get Search() {
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
  get Header() {
    const bodyStyle = {
      padding: '0 0 15px',
      borderRadius: 0,
      minHeight: '70px',
      border: 0,
    }

    return (
      <a-card
        bodyStyle={bodyStyle}
        bordered={false} >
        {this.Search}
        {this.actions && <div>{this.actions(this)}</div>}
      </a-card >
    )
  }

  render() {
    const columns = this.columns
    return (
      <div style='background:#fff;padding:25px;'>
        {this.Header}
        <ITable
          {...{ props: this.tableProps }}
          pagination={this.pagination}
          dataSource={this.dataSource}
          loading={this.loading}
          rowSelection={this.rowSelection}
          columns={typeof columns === 'function' ? columns(this) : columns}
        />
      </div>
    )
  }
}
