import axios from 'axios'
import marked from 'marked'
// tslint:disable-next-line:import-spacing
import hljs from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code) {
    return hljs.highlightAuto(code).value
  },
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
