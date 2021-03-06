```tsx
import { Component } from 'vue-property-decorator'
import { VC } from '@/VC-vue';
import { ITree } from '@/components/Tree';
import Svg from '@/components/Svg';

@Component({})
export default class BaseTree extends VC {

  render() {
    return (
      <ITree
        showIcon
        treeData={treeData}
        treeNodeProps={(v) => ({
          key: 'path',
          child: 'son',
          title: () => <span> {v.title} <Svg name='boy' /> </span>,
          icon: () => {
            switch (v.path) {
              case '0-0': return <Svg name='sunny' />;
              case '0-2': return <Svg name='admin' />;
              default: return <a-icon type='file' />;
            }
          }})}
        />
    )
  }
}

const treeData = [{
  title: '0-0',
  path: '0-0',
  son: [{
    title: '0-0-0',
    path: '0-0-0',
    son: [
      { title: '0-0-0-0', path: '0-0-0-0' },
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
}]
```