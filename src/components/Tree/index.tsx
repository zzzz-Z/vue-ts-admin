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
  function renderNode(arr) {
    return arr.map((r) => {
      const icon = String(r.type) && <a-icon type={iconList[r[type]]} />
      return (
        <a-tree-node
          props={nodeProps}
          title={r[title]}
          icon={icon}
          key={r[key]}>
          {r.children && renderNode(r.children)}
        </a-tree-node>
      )
    })
  }
  return (
    <a-tree
      on={listeners}
      props={props}
      showIcon
    >
      {renderNode(treeData)}
    </a-tree>
  )
}
