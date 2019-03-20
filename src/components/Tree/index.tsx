import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import cloneDeep from 'lodash/cloneDeep';
interface Props {
  /** type 和 icon的对应关系  */
  iconList?: string[]
  /** 树 数组 */
  treeData: any[]
  /** 传递给tree的props 与原组件相同 */
  treeProps?: object
  /** 传递给treeNode的props 与原组件相同 */
  nodeProps?: object
  /** 所有节点统一设置icon */
  icon?: JSX.Element
  /** 支持 a.b 多级字段 替换 原组件传入的title 为自己想要的字段 */
  title?: string
  /** 替换 原组件传入的key 为自己想要的字段 支持 a.b 多级字段 */
  field?: string
  /**  */
  type?: number
  [key: string]: any
}


@Component({})
export default class Tree extends Vue {

  readonly Props!: Props
  @Prop() treeData!: any[]
  @Prop() treeProps?: object
  @Prop() nodeProps?: object
  @Prop() icon?: JSX.Element
  @Prop({ default: 'title' }) title!: string
  @Prop({ default: 'key' }) field !: string
  @Prop({ default: 'type' }) type !: string
  @Prop({ default: () => ['folder-open', 'folder', 'file'] }) iconList!: string[]

  treeNodes: any[] = []

  dropDowm(r) {
    return (
      <a-dropdown style='margin-left:10px;font-size:10px'>
        <a-icon type='down' />
        <a-menu slot='overlay'>
          <a-menu-item>
            <a >1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href='javascript:;'>2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href='javascript:;'>3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    )
  }

  get TreeNodes() {
    const { field, title, iconList, type, nodeProps, treeData, icon } = this
    const titleKeys = title.split('.')
    const fieldKeys = field.split('.')
    const renderNode = (arr: any[]) =>
      arr.map((r) => {
        let t = cloneDeep(r)
        let f = cloneDeep(r)
        titleKeys.forEach((k) => t = t[k])
        fieldKeys.forEach((k) => f = f[k])
        return (
          <a-tree-node
            {...r}
            key={f}
            title={<span>{t}{this.dropDowm(r)}</span>}
            props={nodeProps}
            icon={icon || r.icon || String(r.type) && <a-icon type={iconList[r[type]]} />} >
            {r.children && renderNode(r.children)}
          </a-tree-node>
        )
      })
    return renderNode(treeData)
  }

  render() {
    return (
      <a-tree
        props={this.treeProps}
        on={this.$listeners}>
        {this.TreeNodes}
      </a-tree>
    )
  }
}

