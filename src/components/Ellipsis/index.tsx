import { Component, Vue, Prop } from 'vue-property-decorator'
import { Tooltip } from 'ant-design-vue';

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

interface Props {
  length: number
  width?: number
  str?: string

}
@Component({ components: { ATooltip: Tooltip } })
export default class Ellipsis extends Vue {
  readonly Props!: Props
  /** expect text */
  @Prop() str?: string
  /** 截取长度 */
  @Prop() length!: number
  /** tooltip width */
  @Prop() width?: number

  render() {
    const innerText = this.$slots.default && this.$slots.default.map((vNode) => vNode.text).join('')
    const str = innerText || this.str
    const fullLength = getStrFullLength(str)
    const cutStr = cutStrByFullLength(str, this.length)
    const title = this.width ? <div style={`width:${this.width}px`}> {str} </div > : str
    return (
      <a-tooltip title={title}>
        {fullLength >= this.length + 3 ? cutStr + '...' : str}
      </a-tooltip>
    )
  }
}
