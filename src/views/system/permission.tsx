import { Component, Vue, Provide } from 'vue-property-decorator'
import Tree from '@/components/Tree';


@Component({})
export default class Permission extends Vue {

  @Provide() selectedKeys: string[] = []

  render() {
    const treeData = [{
      name: 'parent 1',
      key: '0',
      type: 0,
      children: [
        { name: 'leaf', key: '1', type: 1, a: 22 },
        {
          name: 'leaf', key: '2', type: 2, children: [
            { name: 'leaf', key: '3', type: 1 },
            { name: 'leaf', key: '4', type: 2 }
          ]
        }
      ]
    }]

    return (
      <div>
        <button onClick={() => this.selectedKeys = ['3']} >click</button>
        <Tree
          treeData={treeData}
          title='name'
          nodeProps={{
            a: 1
          }}
          // icon={<a-icon type='folder' />}
          treeProps={{
            selectedKeys: this.selectedKeys
          }}
          onSelectedChange={(e) => {
            console.log(e)
            console.log(111);
          }}
          onSelect={(key, e) => console.log(e)}
        />
      </div>
    )
  }
}

