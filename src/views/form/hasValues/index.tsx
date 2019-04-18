import { BaseForm } from '../baseForm/form';
import { VC, Component } from '@/VC-vue';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';

@Component({})
export default class HasValues extends VC {
  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='有初始值的表单' />
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
        <Md name='hasValues' />
      </BaseLayout>
    )
  }
}
