import store from '@/store';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'


@Module({ dynamic: true, store, name: 'ResourceStore' })
class Resource extends VuexModule {

  treeData: any[] = []
  checkable = false
  showDropDown = false
  currentRowInfo = {}
  selectedKeys: string[] = []

  @Mutation
  setCheckable(expect: boolean) {
    this.checkable = expect
  }

  @Mutation
  setDropDown(expect: boolean) {
    this.showDropDown = expect
  }
  @Mutation
  setTreeData(treeData: any[]) {
    this.treeData = treeData
  }

  @Mutation
  saveCurrentRowInfo(info: {}) {
    this.currentRowInfo = info
  }

  @Mutation
  setSelectedKeys(selectedKeys: string[]) {
    this.selectedKeys = selectedKeys
  }

}

const ResourceStore = getModule(Resource)
export default ResourceStore
