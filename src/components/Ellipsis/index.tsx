interface Props  {
  length: number
  width?: number
  str?: string
}

export default ({props, children}: VFC<Props>) => {
  const innerText = children && children.map((item) => item.text).join('')
  const str = innerText || props.str
  const fullLength = getStrFullLength(str)
  const cutStr = cutStrByFullLength(str, props.length)
  const title = props.width ? <div style={`width:${props.width}px`}> {str} </div > : str
  const text = fullLength >= props.length + 3 ? cutStr + '...' : str;
  return (
    <a-tooltip title={title}>
      {text}
    </a-tooltip>
  )
}


export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0;
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

