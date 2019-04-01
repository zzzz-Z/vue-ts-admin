import { Component, Vue } from 'vue-property-decorator'
import { ITable } from '@/components/List/table';
import { Title, BaseLayout } from '@/components/Container';

interface Props { }

@Component({})
export default class BaseTable extends Vue {
  readonly Props!: Props

  typeRender(...arg) {
    return <span style='color:rgb(196, 29, 127)'> arg[0]</span>
  }

  render() {
    return (
      <BaseLayout breadcrumb>
        <Title description='洒洒水' >
          基础列表
        </Title>
        <ITable
          align='center'
          tooptip={35}
          dataSource={dataSource}
          columns={[{
            title: '参数',
            dataIndex: 'field'
          }, {
            title: '说明',
            dataIndex: 'description',
          }, {
            title: '类型',
            dataIndex: 'type',
            customRender: this.typeRender
          }, {
            title: '默认值',
            dataIndex: 'default',
          }]} />
      </BaseLayout>
    )
  }
}


const dataSource = [{
  field: 'algin',
  description: '对齐方式',
  type: 'left | right | center',
  default: 'left',
}, {
  field: 'tooptip',
  description: '隐藏超出( tooptip规定字数)文字，tooptip显示',
  type: 'number',
  default: '-',
}, {
  field: '其他',
  description: '除上述字段外其他props',
  type: '同官方一致',
  default: '-',
}]
