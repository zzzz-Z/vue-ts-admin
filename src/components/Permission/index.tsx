interface Permission extends JSX.FunctionalComponentCtx {

}
export default ({ parent, props: { el, type } }: Permission) => {
  const actions = parent && parent.$route.meta.actions as string[]
  const isAllow = actions && actions.includes(type)
  return isAllow ? el : <span style='display:none' />
}
