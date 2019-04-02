import { Component } from 'vue-property-decorator'
import { BaseLayout, Title, CodeWrapper } from '@/components/Container';
import StepForm from './form';
import { getMdStr } from '@/api/md';
import VC from '@/VC-vue';


@Component({})
export default class IStepForm extends VC {
  codeHtml: any = ''

  created() {
    getMdStr('stepForm').then((html) => this.codeHtml = html)
  }
  render() {
    return (
      <BaseLayout breadcrumb>
        <Title >
          分步表单
        </Title>
        <StepForm />
        <CodeWrapper name='stepForm' hid />
      </BaseLayout>
    )
  }
}
