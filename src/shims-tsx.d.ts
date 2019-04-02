import Vue, { VNode, VNodeData } from 'vue'
interface FunctionalComponentCtx {
  props?: any
  children?: VNode[]
  data?: VNodeData
  parent?: Vue
  listeners?: any
  scopedSlots?: any
  injections?: any
  slots?: any
  vPermission?: 'add' | 'dele' | 'edit' | 'check'
  [key: string]: any
}
declare global {

  type FC<S= {}> = FunctionalComponentCtx & S
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicClassAttributes {
      ref?: string
      id?: string
      class?: any
      style?: any
      key?: any
      props?: any
      vPermission?: 'add' | 'dele' | 'edit' | 'check'
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
