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

import Vue, { VNode, CreateElement } from 'vue';
let vm: any = null;
let _uid: number = 0;

export const state = Vue.observable;
export const onCreated = (fn: () => void) => registerHooks('created', fn);
export const onMounted = (fn: (refs: any) => void) => registerHooks('created', fn.bind(null, vm.$refs));

interface Api {
  computed: typeof computed;
  state: typeof Vue.observable ;
  onCreated: typeof onCreated;
  onMounted: typeof onMounted;
}

type CurrentVm<T> = Vue & Readonly<T> & { $props: Readonly<T>, $attrs: Readonly<T> };

interface Options<Props> {
  watch?: any;
  computed?: any;
  props?: string[] | object;
  inheritAttrs?: boolean;
  setup: (this: CurrentVm<Props>, api: Api) => (h: CreateElement) => VNode | object | undefined;
}

type Tsc<P = {}, E = {}> = (props: P & Partial<E>) => VNode;

export function createVc<Props, Event>(options: Options<Props>)
  : Tsc<Props, Event> {
  return {
    ...options,
    beforeCreate() {
      vm = this;
      options.inheritAttrs = !!options.props;
      this.$options.render = options.setup.call(this, {
        state,
        onCreated,
        onMounted,
        computed
      });
      vm = null;
      _uid = 0;
    }
  } as any;
}

function registerHooks(name: string, fn: () => void) {
  vm.$options[name] = vm.$options[name] || [];
  vm.$options[name].push(fn);
}

function computed<O>(options: O): O {
  const field = '__' + _uid;
  if (field in vm) {
    throw new Error(field + '已存在！');
  }
  vm.$options.computed = options;
  return vm;
}
