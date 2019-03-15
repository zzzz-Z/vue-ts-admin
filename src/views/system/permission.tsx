import { Component, Vue, Provide } from 'vue-property-decorator'
import Tree from '@/components/Tree';
import { getStorage } from '@/utils/storage';


@Component({})
export default class Permission extends Vue {

  @Provide() selectedKeys: string[] = []
  @Provide() treeData: any[] = []
  @Provide() ss = 1

  created() {
    this.Axios.get('/role?id=1').then((r) => {
      this.treeData = r.data
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.selectedKeys = ['3']} >click</button>
        <Tree
          ref='tree'
          treeData={this.treeData}
          title='name'
          field='path'
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

          }
          }
          onSelectedChange={(r) => {
            console.log(r)
          }}
          onSelect={(e) => console.log(e)}
        />
      </div>
    )
  }
}

