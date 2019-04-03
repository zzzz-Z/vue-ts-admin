import '../style.less'
import { Component } from 'vue-property-decorator'
import {GlobalStore} from '@/store/global';
import ModalGenerator from '@/components/Modal';
import ResourceStore from './store';
import { IFormItem } from '@/types/form-item';
import { VC } from '@/VC-vue';

@Component({})
export default class Permission extends VC {

  checkedKeys: string[] = []
  currentKey = ''
  searchValue = ''
  showSearchClose = false
  checkable = false
  expandedKeys: string[] = []

  render() {
    return (
      <a-col span={4} >
        <a-input
          suffix={
            <a-icon
              theme='filled'
              style='color:rgba(0, 0, 0, 0.3);cursor:pointer;padding-bottom:5px'
              type='close-circle'
              vShow={this.showSearchClose}
              onClick={() => {
                this.searchValue = ''
                this.onSearch(this.TreeNodes, '', undefined)
                this.showSearchClose = false
              }} />
          }
          onFocus={() => {
            ResourceStore.setCheckable(false)
            this.showSearchClose = true
          }}
          v-model={this.searchValue}
          onChange={({ target: { value } }) => this.onSearch(this.TreeNodes, value, undefined)}
          placeholder='菜单名...'
          style='padding:0 7px 5px;margin-left:-7px'
        />

        <div
          id='tree-box'
          onClick={this.treeboxClick}
          style='background:#fff;margin-right:15px;height:79vh;padding:25px 0;overflow:auto' >
          <a-button
            vShow={ResourceStore.checkable}
            type='primary'
            style='margin-left:10px'
            onClick={() => { this.checkedKeys = ['/system', '/system/user'] }} >
            提交
            </a-button>
          <a-tree
            onSelect={this.onSelect}
            onExpand={this.onExpand}
            v-model={this.checkedKeys}
            onCheck={this.onCheck}
            checkable={ResourceStore.checkable}
            expandedKeys={this.expandedKeys}
            selectedKeys={ResourceStore.selectedKeys}
            showIcon >
            {this.TreeNodes}
          </a-tree>
        </div>

      </a-col>
    )
  }

  Dropdown(r) {
    if (this.currentKey === r.path && ResourceStore.showDropdown) {
      return (
        <a-dropdown
          visible={ResourceStore.showDropdown}
          overlayClassName='system-dropdown'
          style='margin-left:10px;font-size:10px'>
          <a-icon type='down' />
          <a-menu slot='overlay'>
            <a-menu-item vShow={ResourceStore.checkable}>
              {this.EditAction(r)}
            </a-menu-item>
            <a-menu-item vShow={!ResourceStore.checkable}>
              <ModalGenerator
                modal={{ title: '修改模块' }}
                tooltip='修改模块'
                btn={<a-icon type='edit' />}
                formProps={{
                  formItems: this.treeForm(r),
                  labelCol: { span: 5 },
                  wrapperCol: { span: 16 }
                }}
              />
            </a-menu-item>
            <a-menu-item vShow={!ResourceStore.checkable}>
              <ModalGenerator
                modal={{ title: '添加模块' }}
                tooltip='添加模块'
                formProps={{
                  formItems: this.treeForm(r),
                  labelCol: { span: 5 },
                  wrapperCol: { span: 16 }
                }}
                btn={<a-icon type='plus' />}
              />
            </a-menu-item>
            <a-menu-item vShow={!ResourceStore.checkable}>
              <a-popconfirm
                placement='right'
                title='Are you sure？'
                okText='Yes'
                cancelText='No'>
                <a-tooltip title='删除模块'>
                  <a-icon type='delete' />
                </a-tooltip>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      )
    }
  }

  TreeNodeTitle(r) {
    const { searchValue, Dropdown } = this
    const name = r.meta.title

    let title = <span class='itree-title' >{name}{Dropdown(r)}</span>
    if (name.indexOf(this.searchValue) > -1) {
      const startText = name.substr(0, name.indexOf(searchValue))
      const endText = name.substr(name.indexOf(searchValue) + searchValue.length)
      title = <span class='itree-title'>
        {startText}<a style='color:#1DA57A' >{searchValue}</a>{endText}{Dropdown(r)}
      </span>
    }
    return title
  }

  get TreeNodes() {
    const renderNode = (arr: any[]) =>
      arr.map((r) => (
        <a-tree-node
          {...r}
          key={r.path}
          title={this.TreeNodeTitle(r)}
          icon={<a-icon type='folder' />} >
          {r.children && renderNode(r.children)}
        </a-tree-node>
      ))

    return renderNode(GlobalStore.asyncRoutes)
  }

  onExpand(expandedKeys: string[]) {
    this.expandedKeys = expandedKeys
  }

  /**
   *
   * @param arr  需要迭代的treeNode
   * @param title 查询的节点title
   * @param father 父节点的vNode
   * @param selectedKeys 所有符合条件的节点key值
   * @param expandedKeys 所有符合条件的节点的父节点的key值
   */
  // tslint:disable-next-line: max-line-length
  onSearch(arr: JSX.Element[], title: string, father: JSX.Element | undefined, selectedKeys: string[] = [], expandedKeys: string[] = []) {
    if (ResourceStore.showDropdown) {
      ResourceStore.setDropdown(false)
    }
    if (title === '') {
      ResourceStore.setSelectedKeys([])
      this.expandedKeys = []
      return
    }
    arr.forEach((r: JSX.Element) => {
      const { data, componentOptions }: any = r
      if (data.meta.title.indexOf(title) > -1) {
        if (father) {
          (expandedKeys.push((father as any).key), this.expandedKeys = expandedKeys)
        }
      }
      if (componentOptions.children) {
        this.onSearch(componentOptions.children, title, r, selectedKeys, expandedKeys)
      }
    })
  }

  onCheck(...arg: any[]) {
    console.log(arg);
  }

  onSelect(key: string[]) {
    this.currentKey = key[0]
    ResourceStore.setSelectedKeys(key)
    ResourceStore.setDropdown(true)
  }

  EditAction(r: any) {
    return (
      <ModalGenerator
        modal={{ title: '操作权限' }}
        btn={
          <a-tooltip placement='right' title='操作权限'>
            <a-icon type='setting' />
          </a-tooltip>
        }
        formProps={{
          formItems: [{
            field: 'actions',
            label: '拥有权限',
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
            initialValue: [1, 2],
            el: () => (
              <a-select mode='multiple' placeholder='请选择操作权限'  >
                {[{ id: 1, name: 'add' },
                { id: 2, name: 'delete' },
                { id: 3, name: 'update' },
                { id: 4, name: 'check' }]
                  .map((r) => (
                    <a-select-option key={r.id}>
                      {r.name}
                    </a-select-option>))
                }
              </a-select>
            )
          }
          ]
        }}
      />
    )
  }

  treeForm(r: { meta: any; }): IFormItem[] {
    return [{
      label: '名称',
      field: 'name',
      initialValue: r.meta.name,
    }, {
      label: '路径',
      field: 'path',
      initialValue: r.meta.path,
    }, {
      label: '图标',
      field: 'icon'
    }]
  }

  treeboxClick({ target }) {
    if (target.id === 'tree-box' && ResourceStore.checkable) {
      ResourceStore.setCheckable(false)
    }
  }

}
