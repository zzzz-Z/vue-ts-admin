import Breadcrumb from '../Breadcrumb';
import { Component } from 'vue-property-decorator';
import { getMdStr } from '@/api/md';
import { VC } from '@/VC-vue';

export const BaseLayout = (v: FC<{ breadcrumb?: boolean }>) => (
  <div>
    <Breadcrumb vIf={v.props.breadcrumb} />
    <div style='background:#fff;padding:20px' {...v.data}>
      {v.children}
    </div>
  </div>
)
/**
 * @description 标题容器
 */
export const Title = (v: FC<{ description?: string }>) => (
  <a-alert
    style='margin-bottom:20px'
    message={v.children}
    description={v.props.description}
    type='info'
    showIcon
  />
)
/**
 * @description  md 代码容器
 */
export const CodeWrapper = (v: FC<{ name: string; hid?: boolean }>) => {
  const { name, hid } = v.props
  const data = v.data
  @Component({})
  class CodeWrapper extends VC {
    codeHtml: any = null

    created() {
      getMdStr(name).then((html) => this.codeHtml = html)
    }

    render() {
      return (
        <a-collapse
          accordion
          style='margin:20px 0'
          defaultActiveKey={hid ? '0' : '1'}  >
          <a-collapse-panel header='代码演示' key='1'>
            <div v-html={this.codeHtml} />
          </a-collapse-panel>
        </a-collapse>
      )
    }
  }

  return <CodeWrapper {...data} />
}

