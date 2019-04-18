import IForm from '@/components/Form';
import { VC, Props } from '@/VC-vue';
import { Component } from 'vue-property-decorator';

class Fprops {
  initialValues?: {} = {}
}
@Props(Fprops)
@Component({})
export class BaseForm extends VC<Fprops> {

  submit(values) {
    this.$info({
      title: 'Gets the content from the form',
      content: JSON.stringify(values)
    })
  }

  render() {
    return (
      <IForm
        initialValues={this.$props.initialValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 13 }}
        formItems={[{
          field: 'title',
          label: '标题',
          placeholder: '标题'
        }, {
          field: 'time',
          label: '起止时间',
          el: <a-date-picker />
        }, {
          field: 'doc',
          label: '目标描述',
          el: () => <a-textarea placeholder='Basic usage' rows={4} />
        }, {
          field: 'norm',
          label: '衡量标准',
          el: () => <a-textarea placeholder='请输入衡量标准' rows={4} />
        }, {
          field: 'user',
          placeholder: '请描述你服务的客户, name',
          label: (
            <span>
              客户<span style='color:rgba(0,0,0,.45)' > ( 选 填 )
              <a-tooltip title='目标服务对象'><a-icon style='margin-left:5px;' type='info-circle' /></a-tooltip>
              </span>
            </span>
          )
        }, {
          field: 'person',
          placeholder: '请描述你服务的客户, name',
          label: <span>邀评人<span style='color:rgba(0,0,0,.45)'>( 选 填 )</span> </span>
        }, {
          field: 'qz',
          label: <span>权重<span style='color:rgba(0,0,0,.45)'>( 选 填 )</span></span>,
          el: (<span><a-input placeholder='请填写' style='width:20%' /> %</span>)
        }, {
          field: 'mb',
          label: '目标公开',
          initialValue: '1',
          el: (
            <a-radio-group name='radioGroup'>
              <a-radio value='1'>公开</a-radio>
              <a-radio value='2'>部分公开</a-radio>
              <a-radio value='3'>不公开</a-radio>
            </a-radio-group>
          )
        }, {
          wrapperCol: { offset: 6 },
          el: (form) => (
            <div>
              <a-button
                onClick={() => this.submit(form.getFieldsValue())}
                v-html='提交'
                type='primary'
                style='margin-right:20px' />
              <a-button v-html='保存' />
            </div>
          )
        }]} />
    )
  }
}

