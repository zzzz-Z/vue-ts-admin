interface SvgProps extends JSX.FunctionalComponentCtx {
  /** svg文件名 : src/assets/iconfont/${name}.svg */
  name: string
}
export default ({ data, props }: SvgProps) => (
  <a-icon {...data} component={require(`@/assets/iconfont/${props.name}.svg`).default} />
)

