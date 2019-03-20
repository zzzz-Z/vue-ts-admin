export default ({ props, children, data }: IButton) => {
  return (
    props.text
      ? <a {...data} > {props.text} </a>
      : <a-button {...data} > {props.html || children} </a-button>
  )
}
