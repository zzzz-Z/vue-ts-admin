const IButton = ({ props, children, data }: IButton) => (
  props.text
    ? <a {...data} > {props.text} </a>
    : <a-button {...data} > {props.html || children} </a-button>
)
export default IButton
