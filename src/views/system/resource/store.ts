import store from '@/store';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'


@Module({ dynamic: true, store, name: 'ResourceStore' })
class Resource extends VuexModule {

  treeData: any[] = []
  checkable = false
  showDropdown = false
  currentRowInfo = {}
  selectedKeys: string[] = ['/table']

  /** 设置tree是否显示节点的Checkbox 复选框	 */
  @Mutation
  setCheckable(expect: boolean) {
    this.checkable = expect
  }
  /** 设置dropdwon isShow */
  @Mutation
  setDropdown(expect: boolean) {
    this.showDropdown = expect
  }
  /** 设置tree数据 */
  @Mutation
  setTreeData(treeData: any[]) {
    this.treeData = treeData
  }
  /** 保存列表当前行信息 */
  @Mutation
  saveCurrentRowInfo(info: {}) {
    this.currentRowInfo = info
  }
  /** 设置tree的当前选中项 */
  @Mutation
  setSelectedKeys(selectedKeys: string[]) {
    this.selectedKeys = selectedKeys
  }

}

export const ResourceStore = getModule(Resource)
