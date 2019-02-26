import Button from './type';
type Props = Button & JSX.FunctionalComponentCtx

export default (ctx: Props) => {
  const { props, children } = ctx
  return (
    props.text
      ? <a> {props.text} </a>
      : <a-button
        {...{ props: props.config }} >
        {props.html || children}
      </a-button>
  )
}
