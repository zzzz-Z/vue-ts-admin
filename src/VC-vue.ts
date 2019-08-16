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

type ComputedOptions = { [key: string]: (...args: any) => any }
type Computed = typeof computed
type State = typeof Vue.observable
type This<T> = Vue & Readonly<T> & { $props: Readonly<T>, $attrs: Readonly<T> };
type TsComponent<P = {}, E = {}> = (props: P & Partial<E>) => VNode;
interface Api {
  watch(o: object): void;
  state: State;
  computed: Computed;
  onCreated: typeof onCreated;
  onMounted: typeof onMounted;
}

type componentOptions<P> = {
  computed?: any;
  props?: string[] | object;
  inheritAttrs?: boolean;
  setup: (this: This<P>, api: Api) => (h: CreateElement) => VNode
} | ((api: Api & { vm: This<P> }) => (h: CreateElement) => VNode)

function computed<O extends ComputedOptions>(options: O) {
  vm.$options.computed = options
  return vm as { [key in keyof O]: Readonly<ReturnType<O[key]>> };
}
function watch(options: object) {
  vm.$options.watch = options
}

function registerHooks(name: string, fn: () => void) {
  vm.$options[name] = vm.$options[name] || [];
  vm.$options[name].push(fn);
}

export const state = Vue.observable;
export const onCreated = (fn: () => void) => registerHooks('created', fn);
export const onMounted = (fn: (refs: any) => void) => registerHooks('created', fn.bind(null, vm.$refs));

export function createComponent<Props = {}, Event = {}>(options: componentOptions<Props>)
  : TsComponent<Props, Event> {
  const o = {
    watch,
    state,
    onCreated,
    onMounted,
    computed
  }
  return {
    ...options,
    beforeCreate() {
      vm = this;
      if (typeof options === 'function') {
        this.$options.inheritAttrs = false
        this.$options.render = options({ vm: this, ...o });
      } else {
        this.$options.inheritAttrs = !!options.props;
        this.$options.render = options.setup.call(this, o);
      }
      vm = null;
    }
  } as any;
}
