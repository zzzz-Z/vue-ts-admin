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
        { name: '1-1', key: '1', type: 1, a: 22 },
        {
          name: '1-2', key: '2', type: 2, children: [
            { name: '2-1', key: '3', type: 1 },
            { name: '2-2', key: '4', type: 2 }
          ]
        }
      ]
    }]

    return (
      <div>
        <button onClick={() => this.selectedKeys = ['3']} >click</button>
        <Tree
          ref='tree'
          treeData={treeData}
          title='name'
          treeProps={{
            draggable: true,
            defaultExpandAll: true,
            selectedKeys: this.selectedKeys
          }}
          onDrop={(r) => {
            const dropKey = r.node.eventKey // 准备插入nodeKey
            const dragKey = r.dragNode.eventKey// 需要移动的nodeKey
            const dragNode = r.dragNode.$vnode// 需要移动的node
            const addNewNode = (data) => {
              data.find((i, index) => {
                const child = i.componentOptions.children
                if (i.key === dropKey) {
                  child.length > 0 ? // has child
                    child.push(dragNode) : // add to len
                    data.splice(index, 0, dragNode) // add to up
                  return true
                }
                child.length > 0 && addNewNode(child)
              })
            }


            const removeOldNode = (data) => {
              data.find((r, index) => {
                const child = r.componentOptions.children
                if (r.key === dragKey) {
                  data.splice(index, 1)
                  addNewNode((this.$refs.tree as Tree).treeNodes)
                  return true
                }
                child.length > 0 && removeOldNode(child)
              })
            }
            removeOldNode((this.$refs.tree as Tree).treeNodes)


            // const { treeNodes } = (this.$refs.tree as Tree)

            // function loop(arr, key) {
            //   return new Promise((r) => {
            //     arr.find((i, index) => {
            //       const child = i.componentOptions.children
            //       if (i.key === key) {
            //         r({arr, child, index})
            //         console.log(2);
            //         return true
            //       }
            //       child.length > 0 && loop(child, key)
            //     })
            //   })
            // }
            // loop(treeNodes, dragKey).then((r: any) => {
            //   console.log(1);
            //   r.data.splice(r.index, 1)
            //   loop(treeNodes, dropKey).then((v: any) => {
            //     v.child > 0 ?
            //     v.data.push(dragNode) :
            //     v.data.splice(v.index, 0, dragNode)
            //   })
            // })


          }}
          onSelectedChange={(r) => {
            console.log(r)
          }}
          onSelect={(key, e) => console.log(e)}
        />
      </div>
    )
  }
}

