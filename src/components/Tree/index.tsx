interface Props extends JSX.FunctionalComponentCtx {
  /** type 和 icon的对应关系  */
  iconList?: string[]
  treeData: any[]
  nodeProps?: any
  title?: string
  key?: string
  type?: string
}

export default ({
  listeners,
  props: {
    iconList = ['folder-open', 'folder', 'file'],
    treeData,
    nodeProps,
    title = 'title',
    key = 'key',
    type = 'type',
    ...props
  }
}: Props) => {

  const renderNode = (arr) => arr.map((r) => (
    <a-tree-node
      props={{
        key: r[key],
        title: r[title],
        icon: String(r.type) && <a-icon type={iconList[r[type]]} />
      }}>
      {r.children && renderNode(r.children)}
    </a-tree-node>
  ))
  const treeNode = renderNode(treeData)
  const getCurrentNode = (key) => {
     return treeNode.find(vNOde => {
      const child = vNOde.componentOptions.children
      if (vNOde.data.props.key === key) {
        return true
      } else if (child) {
        getCurrentNode(child.data.props.key)
      }
    })
  }
  console.log(treeNode);
  return (
    <a-tree
      on={listeners}
      props={props}
      showIcon >
      {treeNode}
    </a-tree>
  )
}
