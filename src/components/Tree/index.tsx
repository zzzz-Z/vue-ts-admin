import { Component, Vue, Prop, Watch, Provide } from 'vue-property-decorator'

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
  /** 替换 原组件传入的title 为自己想要的字段 */
  title?: string
  /** 替换 原组件传入的key 为自己想要的字段 */
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

  get treeNodes() {
    const { field, title, iconList, type, nodeProps, treeData, icon } = this
    const renderNode = (arr) =>
      arr.map((r) => (
        <a-tree-node
          {...r}
          key={r[field]}
          title={r[title]}
          props={nodeProps}
          icon={icon || (r.type || r.type === 0) ? <a-icon type={iconList[r[type]]} /> : ''} >
          {r.children && renderNode(r.children)}
        </a-tree-node>
      ))
    return renderNode(treeData)
  }


  @Watch('$props.treeProps.selectedKeys', { deep: true })
  selectedChange([key]) {
    let node = null
    let nextKey = null
    const findNode = (arr) => {
      arr.find((vNode, i) => {
        const child = vNode.componentOptions.children
        return vNode.key === key
          ? (node = vNode, nextKey = i >= 1 ? arr[i - 1].key : '')
          : child && findNode(child)
      })
    }
    findNode(this.treeNodes)
    this.$emit('selectedChange', node)
  }

  render() {
    return (
      <a-tree
        props={this.treeProps}
        on={this.$listeners}>
        {this.treeNodes}
      </a-tree>
    )
  }
}

