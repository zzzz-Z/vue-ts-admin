import { VC } from '@/VC-vue';
import { Component } from 'vue-property-decorator';
import { ModalGenerator } from '@/components/Modal';
import { TableWithSearch } from '@/components/TableWithSearch';
import { getList } from '@/services/list';
import { BaseLayout, Title } from '@/components/Container';

@Component({})
export default class SearchTable extends VC {

  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='复杂列表' />
        <TableWithSearch
          fetch={getList}
          actions={this.actions}
          searchItems={[{ label: '搜索1', field: 's1', }, { label: '搜索2', field: 's2' }, { label: '搜索3', field: 's3' }]}
          columns={[{
            title: '名称',
            dataIndex: 'name'
          }, {
            title: '电话',
            dataIndex: 'tel',
          }, {
            title: '描述',
            dataIndex: 'address'
          }, {
            title: '操作',
            dataIndex: 'handle',
            customRender: () => (
              <span>
                <a> 编辑</a>
                <a-divider type='vertical' />
                <a >更多</a>
              </span>
            )
          }]}
        />
      </BaseLayout>
    );
  }

  /** 操作按钮数组VNode  */
  actions(v: TableWithSearch) {
    return [
      <ModalGenerator
        title='新建'
        btn='新建'
        fetch={() => this.Axios.get('')}
        formItems={[{ label: '搜索1', field: 's1', }, { label: '搜索2', field: 's2' }]}
      />
    ];
  }
}
