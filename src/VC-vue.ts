import Vue from 'vue';
import { VueClass } from '@vue/test-utils';
export * from 'vue-property-decorator';

export class VC<P = {}> extends Vue {
  readonly $props!: Readonly<P>;
}

export function Props(props: new () => any) {
  return (target: VueClass<Vue>) => {
    const _props = new props();
    const newProps = {};
    Object.keys(_props).forEach((key) => {
      const value = _props[key];
      newProps[key] = {};
      getType(value) && (newProps[key].type = getType(value));
      getValue(value) && (newProps[key].default = getValue(value));
    });
    const oldProps = target.prototype.constructor.options.props;
    target.prototype.constructor.options.props = { ...oldProps, ...newProps };
  };
}


function getType(attr: any) {
  switch (typeof attr) {
    case 'string': return String;
    case 'number': return Number;
    case 'object': return Object;
    case 'function': return Function;
    case 'undefined': return null;
    case 'boolean': return Boolean;
    case 'boolean': return Boolean;
    case 'symbol': return Symbol;
    case 'bigint': return BigInt;
  }
}

function getValue(vl: any) {
  const type = typeof vl;
  return type === 'object' ? () => vl : vl;

}

function warning(obj: any, key: string) {
  if (typeof obj !== 'object') {
    return;
  }
  if (Object.keys(obj).length === 0) {
    console.error(
      '[Warn]:The initial value of the '
      + key + ' may be an empty object or an empty array, make sure this is what you expect'
    );
  }
}

import Vue, { VNode, CreateElement } from 'vue'

type options<Props> = {
  props?: any,
  inheritAttrs?: boolean,
  setup: (
    this: Vue & { $props: Props, $attrs: Props },
    state: typeof Vue.observable
  ) => (h:CreateElement) => VNode | object | undefined
}

let vm: any = null

export function useCreate(fn: () => void) {
  vm.$options.created = [fn]
}

export function useMounted(fn: () => void) {
  vm.$options.mounted = [fn.bind(null, vm.$refs)]
}


export function createVc<props>(options: options<props>): (props: props) => VNode {

  return {
    ...options,
    beforeCreate() {
      if (!options.props) {
        options.inheritAttrs = false
      }
      vm = this
      this.$options.render = options.setup.call(this, Vue.observable)
      vm = null
    }
  } as any
}

