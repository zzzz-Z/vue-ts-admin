import { Component, Vue } from 'vue-property-decorator'
import { Content, CodeContent } from '@/components/BaseContent';
import StepForm from './form';
import { getMdStr } from '@/api/md';


@Component({})
export default class IStepForm extends Vue {
  codeHtml: any = ''

  created() {
    getMdStr('stepForm').then((html) => this.codeHtml = html)
  }
  render() {
    return (
      <Content>
        <h1 style='text-aglin:center' >分步表单</h1>
        <StepForm />
        <CodeContent html={this.codeHtml} />
      </Content>
    )
  }
}
