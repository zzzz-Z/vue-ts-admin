import pick from 'lodash/pick';
import { Tree } from 'ant-design-vue';
import { TreeNode } from '@/types/tree-nodes';

interface Props extends Partial<Omit<Tree, 'treeData'>> {
  treeData: any[];
  childKey?: string;
  treeNodeProps(nodeData?: any): TreeNode;
}

export const ITree = ({ props, data }: FC<Props>) => {

  const { treeData, childKey = 'children', treeNodeProps, ...restProps } = props!;
  const renderNode = (arr: any[]) =>
    arr.map((r) => {
      const props = treeNodeProps(r);
      return (
        <a-tree-node   {...{ props }} key={props.key} >
          {r[childKey] && renderNode(r[childKey])}
        </a-tree-node>
      );
    });

  data!.props = restProps;
  // attrs上的属性也会被当做props传递给组件，所以把data的attrs属性剔除掉
  data!.attrs = pick(data!.attrs, ['id']);
  return (
    <a-tree {...data}  >
      {renderNode(treeData)}
    </a-tree>
  );
};
