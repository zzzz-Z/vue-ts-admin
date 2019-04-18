import Vue from 'vue';
import { VueClass } from '@vue/test-utils';

export {
  Component,
  Watch,
  Emit,
  Prop,
  Vue,
  Mixins,
  Model,
  Provide,
  Inject
} from 'vue-property-decorator';
export class VC<P = {}> extends Vue {
  readonly $props!: Readonly<P>
}

export function Props(props: new () => any) {
  return (target: VueClass<Vue>) => {
    const _props = new props()
    const newProps = {}
    Object.keys(_props).map((key) => {
      const value = _props[key]
      // warning(value, key)
      newProps[key] = {
        type: getType(value),
        default: getValue(value)
      }
    })
    target.prototype.constructor.options.props = newProps
  }
}


function getType(attr: any) {
  switch (typeof attr) {
    case 'string': return String
    case 'number': return Number
    case 'object': return Object
    case 'function': return Function
    case 'undefined': return undefined
    case 'boolean': return Boolean
    case 'boolean': return Boolean
    case 'symbol': return Symbol
    case 'bigint': return BigInt
  }
}

function getValue(vl: any) {
  return typeof vl === 'object'
    ? () => vl
    : vl
}

function warning(obj: any, key: string) {
  if (typeof obj !== 'object') {
    return
  }
  if (Object.keys(obj).length === 0) {
    console.error(
      '[Warn]:The initial value of the '
      + key + ' may be an empty object or an empty array, make sure this is what you expect'
    );
  }
}
