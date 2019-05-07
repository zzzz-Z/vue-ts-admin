import Vue, { VNode, VNodeData, RenderContext } from 'vue';
interface Fct<P = any> extends Partial<RenderContext<P>> {
  vPermission?: 'add' | 'dele' | 'edit' | 'check';
  [key: string]: any;
}
declare global {
  /** From A, omit a set of properties whose keys are in the union B */
  type Omit<A, B extends keyof A> = Pick<A, { [K in keyof A]: Exclude<K, B> }[keyof A]>;

  type FC<S = {}> = Fct<S> & S;
  namespace JSX {

    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    /** Set which property will be checked */
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicClassAttributes {
      ref?: string;
      id?: string;
      class?: any;
      style?: any;
      key?: any;
      props?: any;
      vPermission?: 'add' | 'dele' | 'edit' | 'check';
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
