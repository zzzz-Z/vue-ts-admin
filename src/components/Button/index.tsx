export default ({ props, children, data }: Button) => {
  return (
    <span {...data} >
      {props.text
        ? <a> {props.text} </a>
        : <a-button
          {...{ props }} >
          {props.html || children}
        </a-button>}
    </span>
  )
}
