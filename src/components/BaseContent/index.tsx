export const Content = ({ children, data }: any) => (
  <div
    style='background:#fff;padding:20px'
    {...data} >
    {children}
  </div>
)

export const CodeContent = ({ props }: any) => (
  <a-collapse accordion style='margin:20px 0' defaultActiveKey='1'  >
    <a-collapse-panel header='代码演示' key='1'>
      <div v-html={props.html} />
    </a-collapse-panel>
  </a-collapse>
)
