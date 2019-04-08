import pick from 'lodash/pick';
import { Tree } from 'ant-design-vue';

interface Props extends Partial<Tree> {
  /** 节点key字段(唯一值) 默认为key */
  nodeKey?: string
  /** 递归的节点字段 默认为children */
  nextLevelKey?: string
  titleRender?(v: any): JSX.Element | string
  iconRender?(v: any): JSX.Element
}

export const ITree = ({ props, data }: FC<Props>) => {

  const { titleRender, iconRender, treeData, nodeKey, nextLevelKey, ...restProps } = props!
  const child = nextLevelKey || 'children'
  const icon = (r) => props!.showIcon && iconRender && iconRender(r)
  const title = (r) => titleRender ? titleRender(r) : r.title
  const renderNode = (arr: any[]) =>
    arr.map((r) => (
      <a-tree-node
        {...r}
        key={r[nodeKey || 'key']}
        title={title(r)}
        icon={icon(r)} >
        {r[child] && renderNode(r[child])}
      </a-tree-node>
    ))

  data!.props = restProps
  // attrs上的属性也会被当做props传递给组件，所以把data的attrs属性剔除掉
  data!.attrs = pick(data!.attrs, ['id'])
  return (
    <a-tree {...data}  >
      {renderNode(treeData!)}
    </a-tree>
  )

}
