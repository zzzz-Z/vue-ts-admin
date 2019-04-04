import { Component } from 'vue-property-decorator'
import { VC } from '@/VC-vue'
import _ from 'lodash';
import { Tree } from 'ant-design-vue';

interface Props extends Partial<Tree> {
  /** 节点key字段(唯一值) 默认为key */
  nodeKey?: string
  /** 递归的节点字段 默认为children */
  nextLevelKey?: string
  titleRender?(v: any): JSX.Element | string
  iconRender?(v: any): JSX.Element | undefined

}

export const ITree = ({ props, data }: FC<Props>) => {

  const { titleRender, iconRender, treeData, nodeKey, nextLevelKey, showIcon } = props!
  const child = nextLevelKey || 'children'
  const icon = (r) => showIcon && iconRender && iconRender(r)
  const title = (r) => titleRender ? titleRender(r) : r.title
  @Component({})
  class VcTree extends VC {
    get TreeNodes() {
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
      return renderNode(treeData!)
    }

    render() {
      props = _.omit(props, 'treeData')
      return (
        <a-tree {...{ on: data!.on, props }}   >
          {this.TreeNodes}
        </a-tree>
      )
    }
  }

  return <VcTree />

}
