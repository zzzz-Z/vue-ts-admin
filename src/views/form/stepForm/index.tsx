import StepForm from './form';
import { VC, Component } from '@/VC-vue';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';

@Component({})
export default class IStepForm extends VC {
  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='分步表单' />
        <StepForm />
        <Md name='stepForm' />
      </BaseLayout>
    )
  }
}
