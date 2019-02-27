import { Component, Vue } from 'vue-property-decorator'
import Tree from '@/components/Tree';


@Component({})
export default class Permission extends Vue {
  render() {
    const treeData = [{
      name: 'parent 1',
      key: '0-0',
      type: 0,
      children: [
        { name: 'leaf', key: '0-0-0', type: 1 },
        { name: 'leaf', key: '0-0-1', type: 2 }
      ]
    }]

    return (
      <Tree
        treeData={treeData}
        title='name'
        defaultExpandAll
        onSelect={() => console.log(1)}
      />
    )
  }
}

