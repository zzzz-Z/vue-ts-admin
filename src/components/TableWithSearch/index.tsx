import './style.less'
import { Component, Prop } from 'vue-property-decorator'
import IForm from '@/components/Form';
import { Column } from '@/types/column';
import { FormUtils } from '@/types/form-ref';
import { IFormItem } from '@/types/form-item';
import { ITable } from '@/components/Table';
import { VC } from '@/VC-vue';
import { Table } from '@/types/table';
import { getList } from '@/api/list';

export interface ITableData {
  dataSource: Array<{}>
  totalSize: number
  totalPage: number
}

export interface ITableProps {
  columns: ((t: TableWithSearch) => Column[]) | Column[]
  algin?: string
  searchItems?: IFormItem[]
  actions?: (t: TableWithSearch) => JSX.Element[]
  customRow?: (...arg: any) => ({})
  tableProps?: Omit<Table, 'columns' | 'customRow' | 'dataSource'>
  /** 是否含有面包屑 */
  breadcrumb?: boolean
  fetch(arg: {}): Promise<ITableData>
}


@Component({})
export class TableWithSearch extends VC<ITableProps> {

  @Prop() columns!: ((t: TableWithSearch) => Column[]) | Column[]
  @Prop() fetch!: (arg: {}) => Promise<ITableData>
  @Prop() query?: (params: {}) => Promise<[]>
  @Prop() searchItems?: any[]
  @Prop() actions?: (t: TableWithSearch) => JSX.Element[]
  @Prop() tableProps?: any
  @Prop() customRow?: (...arg: any) => ({})
  @Prop({ default: true }) breadcrumb?: boolean

  isUp = false
  totalSize = 0
  totalPage = 0
  loading = false
  currentPage = 1
  rowSelection = {}
  dataSource: any[] = []
  get pagination() {
    return {
      current: this.currentPage,
      showTotal: (n) => '共' + n + '条',
      showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize: 12,
      onChange: (n) => this.getData(n).then((_) => this.currentPage = n)
    }
  }

  created() {
    this.getData()
  }

  async getData(n = 1) {
    this.loading = true
    return this.$props.fetch({ num: n })
      .then((res) => {
        this.dataSource = res.dataSource
        this.totalSize = res.totalSize
        this.totalPage = res.totalPage
        this.loading = false
        return true
      })
  }

  /** 按条件查询 */
  _query(form: FormUtils) {
    const params = form.getFieldsValue()
    this.query && this.query(params).then((v) => {
      this.dataSource = v
    })
  }
  /** 重置列表数据 & 搜索条件 */
  reload(form: FormUtils) {
    form.resetFields()
    this.getData().then((r) => {
      this.currentPage = 1
    })
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
      el: (form: FormUtils) => (
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

  render() {
    const { columns, pagination, dataSource, rowSelection, loading, customRow } = this
    const props = {
      pagination,
      rowSelection,
      loading,
      customRow,
      ...this.tableProps,
    }
    const bodyStyle = {
      padding: '0 0 15px',
      borderRadius: 0,
      minHeight: '70px',
      border: 0,
    }
    return (
      <div style='background:#fff;padding:25px;'>
        <a-card
          bodyStyle={bodyStyle}
          bordered={false} >
          {this.Search}
          {this.actions && <div>{this.actions(this)}</div>}
        </a-card >
        <ITable
          {...{ props }}
          dataSource={dataSource}
          columns={typeof columns === 'function' ? columns(this) : columns}
        />
      </div>
    )
  }
}
