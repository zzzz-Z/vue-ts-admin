interface Props {
  length: number;
  width?: number;
  str?: string;
}

export default ({ props, children }: FC<Props>) => {
  const {str, length, width } = props!;
  const innerText = children && children.map((item) => item.text).join('');
  const _str = innerText || str;
  const fullLength = getStrFullLength(_str);
  const cutStr = cutStrByFullLength(_str, length);
  const title = width ? <div style={`width:${width}px`}> {_str} </div > : _str;
  const text = fullLength >= length + 3 ? cutStr + '...' : _str;
  return (
    <a-tooltip title={title}>
      {text}
    </a-tooltip>
  );
};


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

