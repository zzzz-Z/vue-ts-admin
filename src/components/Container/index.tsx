import Breadcrumb from '../Breadcrumb';
import { Component, Vue } from 'vue-property-decorator';
import { getMdStr } from '@/api/md';

interface BaseLayout {
  breadcrumb?: boolean
}

export const BaseLayout = ({ children, data, props }: VFC<BaseLayout>) => (
  <div>
    <Breadcrumb vIf={props.breadcrumb} />
    <div style='background:#fff;padding:20px' {...data}>{children}</div>
  </div>
)

interface Title  {
  description?: string
}
export const Title = ({ children, data, props }: VFC<Title>) => (
  <h1 {...data} style='display:flex;align-items:flex-end'>
    {children}
    <span style='font-size:10px;padding:5px 15px;color:rgba(0, 0, 0, 0.45)' >
      {props.description}
    </span>
  </h1>
)


export const CodeWrapper = ({ data, props }: any) => {
  @Component({})
  class CodeWrapper extends Vue {
    readonly Props
    codeHtml: any = null

    created() {
      getMdStr(props.name).then((html) => this.codeHtml = html)
    }

    render() {
      return (
        <a-collapse accordion style='margin:20px 0' defaultActiveKey={props.hide ? '0' : '1'}  >
          <a-collapse-panel header='代码演示' key='1'>
            <div v-html={this.codeHtml} />
          </a-collapse-panel>
        </a-collapse>
      )
    }
  }

  return <CodeWrapper {...data} />
}

