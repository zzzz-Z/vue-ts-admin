import { VC, Component } from '@/VC-vue';
import { ITree } from '@/components/Tree';
import Svg from '@/components/Svg';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';

@Component({})
export default class FcModal extends VC {

  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='基础tree组件' >
          <div>增加 <b>treeNodeProps</b> 结点描述数据对象，是 treeNodes 中的一项，TreeNode 使用相同的 API。</div>
        </Title>
        <ITree
          showIcon
          onSelect={(...arg) => {
            console.log(arg);
          }}
          treeData={treeData}
          childKey='son'
          treeNodeProps={(v) => ({
            key: 'path',
            title: <span> {v.title} <Svg name='boy' /> </span>,
            icon: () => {
              switch (v.path) {
                case '0-0': return <Svg name='sunny' />;
                case '0-2': return <Svg name='admin' />;
                default: return <a-icon type='file' />;
              }
            }
          })}
        />
        <Md name='baseTree' />
      </BaseLayout>
    );
  }
}

const treeData = [{
  title: '0-0',
  path: '11',
  son: [{
    title: '0-0-0',
    path: '222',
    son: [
      { title: '333', path: '0-0-0-0' },
      { title: '0-0-0-1', path: '0-0-0-1' },
      { title: '0-0-0-2', path: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    path: '0-0-1',
    son: [
      { title: '0-0-1-0', path: '0-0-1-0' },
      { title: '0-0-1-1', path: '0-0-1-1' },
      { title: '0-0-1-2', path: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    path: '0-0-2',
  }],
}, {
  title: '0-1',
  path: '0-1',
  son: [
    { title: '0-1-0-0', path: '0-1-0-0' },
    { title: '0-1-0-1', path: '0-1-0-1' },
    { title: '0-1-0-2', path: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  path: '0-2',
}];
