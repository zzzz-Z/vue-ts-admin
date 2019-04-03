import { Component } from 'vue-property-decorator'
import { BaseForm } from '../baseForm/form';
import { Title, BaseLayout, CodeWrapper } from '@/components/Container';
import { VC } from '@/VC-vue';

@Component({})
export default class HasValues extends VC {
  render() {
    return (
      <BaseLayout breadcrumb>
        <Title description='有初始值的表单' >
          有初始值的表单
        </Title>
        <BaseForm
          initialValues={{
            title: '标题',
            doc: 'the time',
            norm: '特朗普',
            user: '马克龙',
            person: '张晨成',
            qz: '权重',
            time: this.moment('2015/01/01', 'YYYY/MM/DD')
          }} />
        <CodeWrapper name='hasValues' hid />
      </BaseLayout>
    )
  }
}
