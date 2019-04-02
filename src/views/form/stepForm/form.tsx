import { Component } from 'vue-property-decorator'
import IForm from '@/components/Form';
import VC from '@/VC-vue';

interface Props { }

@Component({})
export default class StepForm extends VC {
  readonly Props!: Props
  currentStep = 0
  loading = false

  isShow(step: 1 | 0) {
    return !this.currentStep && step ? 'display:block' : 'display:none'
  }
  get btnText() {
    return !this.currentStep ? '下一步' : '上一步'
  }
  render() {

    return (
      <div>
        <a-steps
          current={this.currentStep}
          size='small'
          style='width:70%;margin:50px auto;'>
          <a-step title='Finished' />
          <a-step title='In Progress' />
          <a-step title='Waiting' />
        </a-steps>
        <IForm
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 13 }}
          formItems={[{
            field: 'title',
            label: '标题',
            placeholder: '标题',
            style: this.isShow(1)
          }, {
            field: 'time',
            label: '起止时间',
            style: this.isShow(1),
            el: <a-date-picker />
          }, {
            field: 'doc',
            label: '目标描述',
            style: this.isShow(0),
            el: () => <a-textarea placeholder='Basic usage' rows={4} />
          }, {
            field: 'norm',
            label: '衡量标准',
            el: () => <a-textarea placeholder='请输入衡量标准' rows={4} />
          }, {
            wrapperCol: { offset: 6 },
            el: () => (
              <div>
                <a-button
                  loading={this.loading}
                  onClick={() => {
                    this.currentStep = 2
                    this.loading = true
                    setTimeout(() => { this.loading = false }, 2000);
                  }}
                  style='margin-right:20px'
                  type='primary'
                  v-show={this.currentStep}
                  v-html='保存' />
                <a-button
                  onClick={() => { this.currentStep = this.currentStep ? 0 : 1 }}
                  v-html={this.btnText}
                  type={!this.currentStep ? 'primary' : 'default'}
                />
              </div>
            )
          }]} />
      </div>

    )
  }
}
