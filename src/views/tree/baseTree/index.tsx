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
          <div>增加 <b>nodeKey</b>  字段用于自定义唯一标识（原组件只能使用<b>key</b> 作为唯一标识 ）</div>
          <div>增加 <b>nextLevelKey</b>  字段用于自定义需要递归的属性（原组件只能使用<b>children</b> 作为唯一标识 ）</div>
          <div> 增加<b>titleRender</b>字段,用于自定义title,可以根据函数参数 动态渲染title </div>
          <div> 增加<b>iconRender</b>字段,用于自定义icon,可以根据函数参数 动态渲染icon </div>
        </Title>
        <ITree
          showIcon
          treeData={treeData}
          nodeKey='path'
          nextLevelKey='son'
          titleRender={(v) => <span> {v.title} <Svg name='boy' /> </span>}
          iconRender={(v) => {
            switch (v.path) {
              case '0-0':
                return <Svg name='sunny' />
                break;
              case '0-2':
                return <Svg name='admin' />
                break;
              default:
                return <a-icon type='file' />
                break;
            }
          }}
        />
        <Md name='baseTree' />
      </BaseLayout>
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
