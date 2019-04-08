import { VC, Component } from '@/VC-vue';
import { getMdStr } from '@/api/md';

/**
 * @description  md 代码容器
 */
@Component({ props: ['name'] })
export class CodeWrapper extends VC<{ name: string }> {
  codeHtml: any = null

  created() {
    getMdStr(this.$props.name).then((html) => {
      this.codeHtml = html
    })
  }

  render() {
    return (
      <a-collapse accordion style='margin:20px 0'  >
        <a-collapse-panel header='代码演示' key='0'>
          <div v-html={this.codeHtml} />
        </a-collapse-panel>
      </a-collapse>
    )
  }
}
