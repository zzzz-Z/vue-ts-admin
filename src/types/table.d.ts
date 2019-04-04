import { Column } from './column';
import { PaginationConfig } from 'ant-design-vue/types/list/list';

interface Table {

  /**
   * Data record array to be displayed
   * @type any
   */
  dataSource: any[];

  /**  统一设置对齐方式 */
  align?: 'left' | 'right' | 'center'

  /**
   * 是否对超出长度的文字进行隐藏 用tooptip显示
   *  参数接收一个数字 表示临界数字
   */
  tooptip?: number

  /**
   * Whether to show all table borders
   * @default false
   * @type  boolean
   */
  bordered?: boolean;
  /**
   * string|function
   */
  rowKey?: any

  /**
   * The column contains children to display
   * @default 'children'
   * @type string | string[]
   */
  childrenColumnName?: string | string[];

  /**
   * Columns of table
   * @type any
   */
  columns: Column[];

  /**
   * Override default table elements
   * @type object
   */
  components?: object;

  /**
   * Data record array to be displayed
   * @type any
   */
  // dataSource: any;

  /**
   * Expand all rows initially
   * @default false
   * @type boolean
   */
  defaultExpandAllRows?: boolean;

  /**
   * Initial expanded row keys
   * @type string[]
   */
  defaultExpandedRowKeys?: string[];

  /**
   * Current expanded row keys
   * @type string[]
   */
  expandedRowKeys?: string[];

  /**
   * Expanded container render for each row
   * @type Function
   */
  expandedRowRender?: (record: any, index: number, indent: number, expanded: boolean) => any;

  /**
   * Customize row expand Icon.
   * @type Function | ScopedSlot
   */
  expandIcon?: any;

  /**
   * Whether to expand row by clicking anywhere in the whole row
   * @default false
   * @type boolean
   */
  expandRowByClick?: boolean;

  /**
   * Table footer renderer
   * @type Function | ScopedSlot
   */
  footer?: any

  /**
   * Indent size in pixels of tree data
   * @default 15
   * @type number
   */
  indentSize?: number;

  /**
   * Loading status of table
   * @default false
   * @type boolean | object
   */
  // loading?: any

  /**
   * i18n text including filter, sort, empty text, etc
   * @default { filterConfirm: 'Ok', filterReset: 'Reset', emptyText: 'No Data' }
   * @type object
   */
  locale?: object;

  /**
   * Pagination config or [Pagination] (/components/pagination/), hide it by setting it to false
   * @type boolean | PaginationConfig
   */
  pagination?: any;

  /**
   * Row's className
   * @type Function
   */
  rowClassName?: (record: any, index: number) => string;

  /**
   * Row's unique key, could be a string or function that returns a string
   * @default 'key'
   * @type string | Function
   */
  // rowKey: string | Function;

  /**
   * Row selection config
   * @type object
   */
  // rowSelection: TableRowSelection;

  /**
   * Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area.
   * It is recommended to set a number for x, if you want to set it to true,
   * you need to add style .ant-table td { white-space: nowrap; }.
   * @type object
   */
  scroll?: { x: number | true; y: number };

  /**
   * Whether to show table header
   * @default true
   * @type boolean
   */
  showHeader?: boolean;

  /**
   * Size of table
   * @default 'default'
   * @type string
   */
  size?: 'default' | 'middle' | 'small' | 'large';

  /**
   * Table title renderer
   * @type Function | ScopedSlot
   */
  title?: any;

  /**
   * Set props on per header row
   * @type Function
   */
  customHeaderRow?: (
    column: any,
    index: number,
  ) => {
    props: object;
    attrs: object;
    on: object;
    class: object;
    style: object;
    nativeOn: object;
  };

  /**
   * Set props on per row
   * @type Function
   */
  customRow?: (
    record: any,
    index: number,
  ) => {
    props: object;
    attrs: object;
    on: object;
    class: object;
    style: object;
    nativeOn: object;
  };
}
