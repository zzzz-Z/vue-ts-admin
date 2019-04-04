import { Component } from 'vue-property-decorator'
import { BaseLayout, Title, CodeWrapper } from '@/components/Container';
import StepForm from './form';
import { VC } from '@/VC-vue';


@Component({})
export default class IStepForm extends VC {
  render() {
    return (
      <BaseLayout breadcrumb>
        <Title title='分步表单' />
        <StepForm />
        <CodeWrapper name='stepForm' hid />
      </BaseLayout>
    )
  }
}
