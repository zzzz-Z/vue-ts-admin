import { VC, Component } from '@/VC-vue';
import axios from 'axios'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => (window as any).hljs.highlightAuto(code).value,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export async function getMdStr(name: string): Promise<string> {
  const { data } = await axios.get(`/md/${name}.md`)
  return new Promise((resolve) => {
    marked(data, (err, codeString) => resolve(codeString))
  })
}

/**
 * @description  md 代码容器
 */
@Component({ props: ['name'] })
export class Md extends VC<{ name: string }> {
  codeHtml: any = null

  created() {
    getMdStr(this.$props.name).then((html) => {
      this.codeHtml = html
    })
  }

  render() {
    return (
      <a-collapse accordion style='margin:20px 0;'  >
        <a-collapse-panel header='代码演示' key='0'>
          <div
            style='background: #282c34; color: rgba(255,255,255,.5);margin:-16px;padding:7px'
            v-html={this.codeHtml} />
        </a-collapse-panel>
      </a-collapse>
    )
  }
}
